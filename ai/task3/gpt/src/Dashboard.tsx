import React, { useEffect, useState } from 'react';

export default function Dashboard() {
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {
    // 1. Определяем текст кода воркера как строку
    const workerCode = `
      self.onmessage = function(event) {
        if (event.data === 'start') {
          let t = 0;
          for (let i = 0; i < 1e9; i++) {
            t += i;
          }
          self.postMessage(t);
        }
      };
    `;

    // 2. Создаём Blob из этого кода и получаем URL
    const blob = new Blob([workerCode], { type: 'application/javascript' });
    const workerUrl = URL.createObjectURL(blob);

    // 3. Создаём новый воркер по ссылке
    const worker = new Worker(workerUrl);

    // 4. Устанавливаем слушатель, чтобы получить ответ
    const handleMessage = (e: MessageEvent<number>) => {
      setResult(e.data);
      // После получения результата можно убить воркер, если больше не нужен
      worker.terminate();
      URL.revokeObjectURL(workerUrl);
    };
    worker.addEventListener('message', handleMessage);

    // 5. Отправляем команду «start»
    worker.postMessage('start');

    // 6. На случай, если компонент размонтируют до получения ответа
    return () => {
      worker.removeEventListener('message', handleMessage);
      worker.terminate();
      URL.revokeObjectURL(workerUrl);
    };
  }, []);

  return (
    <div>
      {result === null ? (
        <p>Calculating…</p>
      ) : (
        <p>Computed value: {result}</p>
      )}
    </div>
  );
}
