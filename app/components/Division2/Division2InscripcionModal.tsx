import { Modal } from '@juki-team/base-ui';
import { useFetcher } from '@remix-run/react';
import { useEffect, useRef, useState } from 'react';
import {
  type Division2InscripcionResponse,
  type Division2RegistrationErrors,
  type Division2RegistrationInput,
  TALLA_POLERA_OPTIONS,
  validateDivision2Registration,
} from '~/helpers/division2';

const EMPTY_INPUT: Division2RegistrationInput = {
  nombreCompleto: '',
  nickname: '',
  celular: '',
  correo: '',
  telegramUsuario: '',
  tallaPolera: '',
  comentario: '',
};

export function Division2InscripcionModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const fetcher = useFetcher<Division2InscripcionResponse>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [input, setInput] = useState<Division2RegistrationInput>(EMPTY_INPUT);
  const [matriculaFile, setMatriculaFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Division2RegistrationErrors>({});
  const [view, setView] = useState<'form' | 'success'>('form');

  const isSubmitting = fetcher.state !== 'idle';

  useEffect(() => {
    if (isOpen) {
      setInput(EMPTY_INPUT);
      setMatriculaFile(null);
      setErrors({});
      setView('form');
      if (fileInputRef.current) fileInputRef.current.value = '';
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

  function handleChange<K extends keyof Division2RegistrationInput>(field: K, value: string) {
    setInput((prev) => ({ ...prev, [field]: value }));
  }

  function handleFileChange(file: File | null) {
    setMatriculaFile(file);
    const fileErrors = validateDivision2Registration(input, file ? { name: file.name, size: file.size, type: file.type } : null);
    setErrors((prev) => ({ ...prev, matriculaPdf: fileErrors.matriculaPdf }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const nextErrors = validateDivision2Registration(
      input,
      matriculaFile ? { name: matriculaFile.name, size: matriculaFile.size, type: matriculaFile.type } : null,
    );
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const formData = new FormData();
    formData.set('nombreCompleto', input.nombreCompleto.trim());
    formData.set('nickname', input.nickname.trim());
    formData.set('celular', input.celular.trim());
    formData.set('correo', input.correo.trim());
    formData.set('telegramUsuario', input.telegramUsuario.trim());
    formData.set('tallaPolera', input.tallaPolera);
    formData.set('comentario', input.comentario.trim());
    if (matriculaFile) formData.set('matriculaPdf', matriculaFile);

    fetcher.submit(formData, { method: 'post', action: '/division-2/inscripcion', encType: 'multipart/form-data' });
  }

  const submitError = fetcher.data && !fetcher.data.success ? fetcher.data.message : null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeIcon closeOnClickOverlay closeOnKeyEscape>
      <div className="d2-modal">
        {view === 'success' ? (
          <div className="d2-success">
            <div className="d2-success-icon">✅</div>
            <p className="d2-success-text">¡Estás inscrito! Queda atento a tu correo y Telegram.</p>
            <button type="button" className="d2-submit-btn" onClick={onClose}>
              Cerrar
            </button>
          </div>
        ) : (
          <form className="d2-form" onSubmit={handleSubmit} noValidate>
            <h2 className="d2-form-title">Inscripción · Competencia División 2</h2>

            <div className="d2-field">
              <label className="d2-label" htmlFor="d2-nombreCompleto">
                Nombre Completo
              </label>
              <input
                id="d2-nombreCompleto"
                className={`d2-input${errors.nombreCompleto ? ' has-error' : ''}`}
                type="text"
                value={input.nombreCompleto}
                onChange={(e) => handleChange('nombreCompleto', e.target.value)}
              />
              {errors.nombreCompleto && <span className="d2-error">{errors.nombreCompleto}</span>}
            </div>

            <div className="d2-field">
              <label className="d2-label" htmlFor="d2-nickname">
                NickName
              </label>
              <input
                id="d2-nickname"
                className={`d2-input${errors.nickname ? ' has-error' : ''}`}
                type="text"
                value={input.nickname}
                onChange={(e) => handleChange('nickname', e.target.value)}
              />
              {errors.nickname && <span className="d2-error">{errors.nickname}</span>}
            </div>

            <div className="d2-field">
              <label className="d2-label" htmlFor="d2-matriculaPdf">
                Matrícula (PDF, máx. 10MB, opcional)
              </label>
              <input
                id="d2-matriculaPdf"
                ref={fileInputRef}
                className={`d2-input d2-file-input${errors.matriculaPdf ? ' has-error' : ''}`}
                type="file"
                accept="application/pdf,.pdf"
                onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
              />
              {errors.matriculaPdf && <span className="d2-error">{errors.matriculaPdf}</span>}
              <p className="d2-note">
                Esta competencia es exclusiva para estudiantes de la UMSA. Si no adjuntas el PDF de tu matrícula, tu inscripción no será tomada en
                cuenta. Si eres participante de la OBI, la OFBI o la IOI, acláralo en el campo de Comentario.
              </p>
            </div>

            <div className="d2-field">
              <label className="d2-label" htmlFor="d2-celular">
                Número de Celular
              </label>
              <input
                id="d2-celular"
                className={`d2-input${errors.celular ? ' has-error' : ''}`}
                type="tel"
                inputMode="numeric"
                maxLength={8}
                value={input.celular}
                onChange={(e) => handleChange('celular', e.target.value.replace(/\D/g, ''))}
              />
              {errors.celular && <span className="d2-error">{errors.celular}</span>}
            </div>

            <div className="d2-field">
              <label className="d2-label" htmlFor="d2-correo">
                Correo
              </label>
              <input
                id="d2-correo"
                className={`d2-input${errors.correo ? ' has-error' : ''}`}
                type="email"
                value={input.correo}
                onChange={(e) => handleChange('correo', e.target.value)}
              />
              {errors.correo && <span className="d2-error">{errors.correo}</span>}
            </div>

            <div className="d2-field">
              <label className="d2-label" htmlFor="d2-telegramUsuario">
                Usuario de Telegram
              </label>
              <input
                id="d2-telegramUsuario"
                className={`d2-input${errors.telegramUsuario ? ' has-error' : ''}`}
                type="text"
                placeholder="@vozinha"
                value={input.telegramUsuario}
                onChange={(e) => handleChange('telegramUsuario', e.target.value)}
              />
              {errors.telegramUsuario && <span className="d2-error">{errors.telegramUsuario}</span>}
            </div>

            <div className="d2-field">
              <label className="d2-label" htmlFor="d2-tallaPolera">
                Talla de polera
              </label>
              <select
                id="d2-tallaPolera"
                className={`d2-input d2-select${errors.tallaPolera ? ' has-error' : ''}`}
                value={input.tallaPolera}
                onChange={(e) => handleChange('tallaPolera', e.target.value)}
              >
                <option value="">Selecciona una talla</option>
                {TALLA_POLERA_OPTIONS.map((talla) => (
                  <option key={talla} value={talla}>
                    {talla}
                  </option>
                ))}
              </select>
              {errors.tallaPolera && <span className="d2-error">{errors.tallaPolera}</span>}
            </div>

            <div className="d2-field">
              <label className="d2-label" htmlFor="d2-comentario">
                Comentario (opcional)
              </label>
              <textarea
                id="d2-comentario"
                className="d2-input d2-textarea"
                rows={3}
                placeholder="Ej: participo de la OBI / OFBI / IOI"
                value={input.comentario}
                onChange={(e) => handleChange('comentario', e.target.value)}
              />
            </div>

            {submitError && <div className="d2-submit-error">{submitError}</div>}

            <button type="submit" className="d2-submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Subiendo…' : 'Subir'}
            </button>
          </form>
        )}
      </div>
    </Modal>
  );
}
