import { Modal } from '@juki-team/base-ui';
import { useFetcher } from '@remix-run/react';
import { useEffect, useState } from 'react';
import {
  type Division1InscripcionResponse,
  type Division1MatriculaFiles,
  type Division1RegistrationErrors,
  type Division1RegistrationInput,
  type MatriculaFieldKey,
  validateDivision1Registration,
} from '~/helpers/division1';

const EMPTY_INPUT: Division1RegistrationInput = {
  nombreEquipo: '',
  participante1Nombre: '',
  participante2Nombre: '',
  participante3Nombre: '',
  reservaNombre: '',
  celularRepresentante: '',
  correoRepresentante: '',
  telegramRepresentante: '',
  comentario: '',
};

const EMPTY_FILES: Record<MatriculaFieldKey, File | null> = {
  participante1Matricula: null,
  participante2Matricula: null,
  participante3Matricula: null,
  reservaMatricula: null,
};

const MATRICULA_NOTE =
  'Si este integrante ya compitió representando al Club en una edición anterior de esta competencia, no es necesario adjuntar su matrícula. ' +
  'Si nunca compitió representando al Club, la matrícula es obligatoria — de lo contrario, el equipo no podrá ser inscrito.';

const RESERVA_NOTE = 'Este participante reemplazará a cualquiera de los 3 titulares del equipo si alguno presenta algún inconveniente más adelante.';

function toFileInfo(file: File | null) {
  return file ? { name: file.name, size: file.size, type: file.type } : null;
}

function TextField({
  id,
  label,
  value,
  error,
  type = 'text',
  placeholder,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  error?: string;
  type?: string;
  placeholder?: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="d1-field">
      <label className="d1-label" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        className={`d1-input${error ? ' has-error' : ''}`}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {error && <span className="d1-error">{error}</span>}
    </div>
  );
}

function MatriculaField({
  id,
  label,
  error,
  note,
  onChange,
}: {
  id: string;
  label: string;
  error?: string;
  note: string;
  onChange: (file: File | null) => void;
}) {
  return (
    <div className="d1-field">
      <label className="d1-label" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        className={`d1-input d1-file-input${error ? ' has-error' : ''}`}
        type="file"
        accept="application/pdf,.pdf"
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
      />
      {error && <span className="d1-error">{error}</span>}
      <p className="d1-note">{note}</p>
    </div>
  );
}

export function Division1InscripcionModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const fetcher = useFetcher<Division1InscripcionResponse>();

  const [input, setInput] = useState<Division1RegistrationInput>(EMPTY_INPUT);
  const [matriculaFiles, setMatriculaFiles] = useState(EMPTY_FILES);
  const [errors, setErrors] = useState<Division1RegistrationErrors>({});
  const [view, setView] = useState<'form' | 'success'>('form');

  const isSubmitting = fetcher.state !== 'idle';

  useEffect(() => {
    if (isOpen) {
      setInput(EMPTY_INPUT);
      setMatriculaFiles(EMPTY_FILES);
      setErrors({});
      setView('form');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    if (fetcher.state !== 'idle' || !fetcher.data) return;

    const response = fetcher.data;
    if (response.success) {
      setView('success');
    } else if (response.fieldErrors) {
      setErrors((prev) => ({ ...prev, ...response.fieldErrors }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetcher.state, fetcher.data]);

  function handleChange<K extends keyof Division1RegistrationInput>(field: K, value: string) {
    setInput((prev) => ({ ...prev, [field]: value }));
  }

  function handleFileChange(field: MatriculaFieldKey, file: File | null) {
    setMatriculaFiles((prev) => ({ ...prev, [field]: file }));
    const fileErrors = validateDivision1Registration(input, { [field]: toFileInfo(file) });
    setErrors((prev) => ({ ...prev, [field]: fileErrors[field] }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const matriculaFileInfos: Division1MatriculaFiles = {
      participante1Matricula: toFileInfo(matriculaFiles.participante1Matricula),
      participante2Matricula: toFileInfo(matriculaFiles.participante2Matricula),
      participante3Matricula: toFileInfo(matriculaFiles.participante3Matricula),
      reservaMatricula: toFileInfo(matriculaFiles.reservaMatricula),
    };

    const nextErrors = validateDivision1Registration(input, matriculaFileInfos);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const formData = new FormData();
    formData.set('nombreEquipo', input.nombreEquipo.trim());
    formData.set('participante1Nombre', input.participante1Nombre.trim());
    formData.set('participante2Nombre', input.participante2Nombre.trim());
    formData.set('participante3Nombre', input.participante3Nombre.trim());
    formData.set('reservaNombre', input.reservaNombre.trim());
    formData.set('celularRepresentante', input.celularRepresentante.trim());
    formData.set('correoRepresentante', input.correoRepresentante.trim());
    formData.set('telegramRepresentante', input.telegramRepresentante.trim());
    formData.set('comentario', input.comentario.trim());
    for (const [field, file] of Object.entries(matriculaFiles)) {
      if (file) formData.set(field, file);
    }

    fetcher.submit(formData, { method: 'post', action: '/division-1/inscripcion', encType: 'multipart/form-data' });
  }

  const submitError = fetcher.data && !fetcher.data.success ? fetcher.data.message : null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeIcon closeOnClickOverlay closeOnKeyEscape className="d1-modal-card">
      <div className="d1-modal">
        {view === 'success' ? (
          <div className="d1-success">
            <div className="d1-success-icon">✅</div>
            <p className="d1-success-text">¡Estás inscrito! Queda atento a tu correo y Telegram.</p>
            <button type="button" className="d1-submit-btn" onClick={onClose}>
              Cerrar
            </button>
          </div>
        ) : (
          <form className="d1-form" onSubmit={handleSubmit} noValidate>
            <h2 className="d1-form-title">Inscripción · Competencia División 1</h2>

            <TextField
              id="d1-nombreEquipo"
              label="Nombre de equipo"
              value={input.nombreEquipo}
              error={errors.nombreEquipo}
              onChange={(v) => handleChange('nombreEquipo', v)}
            />

            <h3 className="d1-group-title">Participante 1</h3>
            <TextField
              id="d1-participante1Nombre"
              label="Nombre completo"
              value={input.participante1Nombre}
              error={errors.participante1Nombre}
              onChange={(v) => handleChange('participante1Nombre', v)}
            />
            <MatriculaField
              id="d1-participante1Matricula"
              label="Matrícula (PDF, máx. 10MB, opcional)"
              error={errors.participante1Matricula}
              note={MATRICULA_NOTE}
              onChange={(file) => handleFileChange('participante1Matricula', file)}
            />

            <h3 className="d1-group-title">Participante 2</h3>
            <TextField
              id="d1-participante2Nombre"
              label="Nombre completo"
              value={input.participante2Nombre}
              error={errors.participante2Nombre}
              onChange={(v) => handleChange('participante2Nombre', v)}
            />
            <MatriculaField
              id="d1-participante2Matricula"
              label="Matrícula (PDF, máx. 10MB, opcional)"
              error={errors.participante2Matricula}
              note={MATRICULA_NOTE}
              onChange={(file) => handleFileChange('participante2Matricula', file)}
            />

            <h3 className="d1-group-title">Participante 3</h3>
            <TextField
              id="d1-participante3Nombre"
              label="Nombre completo"
              value={input.participante3Nombre}
              error={errors.participante3Nombre}
              onChange={(v) => handleChange('participante3Nombre', v)}
            />
            <MatriculaField
              id="d1-participante3Matricula"
              label="Matrícula (PDF, máx. 10MB, opcional)"
              error={errors.participante3Matricula}
              note={MATRICULA_NOTE}
              onChange={(file) => handleFileChange('participante3Matricula', file)}
            />

            <h3 className="d1-group-title">Participante de reserva (opcional)</h3>
            <div className="d1-field">
              <label className="d1-label" htmlFor="d1-reservaNombre">
                Nombre completo
              </label>
              <input
                id="d1-reservaNombre"
                className="d1-input"
                type="text"
                value={input.reservaNombre}
                onChange={(e) => handleChange('reservaNombre', e.target.value)}
              />
              <p className="d1-note">{RESERVA_NOTE}</p>
            </div>
            <MatriculaField
              id="d1-reservaMatricula"
              label="Matrícula (PDF, máx. 10MB, opcional)"
              error={errors.reservaMatricula}
              note={MATRICULA_NOTE}
              onChange={(file) => handleFileChange('reservaMatricula', file)}
            />

            <h3 className="d1-group-title">Representante del equipo</h3>
            <p className="d1-note">El representante debe ser uno de los 3 integrantes titulares del equipo.</p>
            <TextField
              id="d1-celularRepresentante"
              label="Número de Celular"
              value={input.celularRepresentante}
              error={errors.celularRepresentante}
              type="tel"
              onChange={(v) => handleChange('celularRepresentante', v.replace(/\D/g, '').slice(0, 8))}
            />
            <TextField
              id="d1-correoRepresentante"
              label="Correo"
              value={input.correoRepresentante}
              error={errors.correoRepresentante}
              type="email"
              onChange={(v) => handleChange('correoRepresentante', v)}
            />
            <TextField
              id="d1-telegramRepresentante"
              label="Usuario de Telegram"
              value={input.telegramRepresentante}
              error={errors.telegramRepresentante}
              placeholder="@vozinha"
              onChange={(v) => handleChange('telegramRepresentante', v)}
            />

            <div className="d1-field">
              <label className="d1-label" htmlFor="d1-comentario">
                Comentario (opcional)
              </label>
              <textarea
                id="d1-comentario"
                className="d1-input d1-textarea"
                rows={3}
                value={input.comentario}
                onChange={(e) => handleChange('comentario', e.target.value)}
              />
            </div>

            {submitError && <div className="d1-submit-error">{submitError}</div>}

            <button type="submit" className="d1-submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Subiendo…' : 'Subir'}
            </button>
          </form>
        )}
      </div>
    </Modal>
  );
}
