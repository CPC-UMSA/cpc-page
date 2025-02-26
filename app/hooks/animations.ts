import { useEffect, useRef } from './commons';

const delay = 50;

export const useSnow = () => {
  const lastTimeRef = useRef(0);
  useEffect(() => {
    function createSnowflake(_x: number, _y: number) {
      const x = _x + (Math.random() < 0.5 ? -1 : 1) * (Math.random() * 80);
      const y = _y + (Math.random() < 0.5 ? -1 : 1) * (Math.random() * 80);
      
      const currentTime = Date.now(); // Obtiene el tiempo actual
      if (currentTime - lastTimeRef.current < delay) return; // Si no ha pasado suficiente tiempo, sale
      lastTimeRef.current = currentTime; // Actualiza el último tiempo
      
      // Crear el copo de nieve
      const snowflake = document.createElement('div');
      snowflake.classList.add('snowflake');
      
      // Posición del copo
      snowflake.style.left = `${x}px`;
      snowflake.style.top = `${y}px`;
      
      // Tamaño aleatorio
      const size = Math.random() * 20 + 10; // Entre 10px y 30px
      snowflake.style.width = `${size}px`;
      snowflake.style.height = `${size}px`;
      snowflake.style.zIndex = '2000';
      // snowflake.innerHTML = snowflakeSVG;
      
      // Agregar al body
      document.body.appendChild(snowflake);
      
      // Eliminar el copo después de la animación
      setTimeout(() => {
        snowflake.remove();
      }, 10000);
    }
    
    // Evento para mover el ratón
    document.addEventListener('mousemove', (e) => {
      createSnowflake(e.pageX, e.pageY);
    });
    
    // Evento para hacer click
    document.addEventListener('click', (e) => {
      createSnowflake(e.pageX, e.pageY);
    });
  }, []);
};
