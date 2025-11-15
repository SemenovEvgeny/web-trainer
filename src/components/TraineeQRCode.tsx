import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useApp } from '../hooks/useApp';
import { X, QrCode, Download } from 'lucide-react';

interface TraineeQRCodeProps {
  onClose: () => void;
}

export default function TraineeQRCode({ onClose }: TraineeQRCodeProps) {
  const { currentUser, allAvailableTrainees } = useApp();
  const [selectedTraineeId, setSelectedTraineeId] = useState('');

  // Генерируем URL для добавления спортсмена
  const getQRUrl = (traineeId: string) => {
    const baseUrl = window.location.origin;
    return `${baseUrl}/join?trainer=${currentUser?.id}&trainee=${traineeId}`;
  };

  const selectedTrainee = allAvailableTrainees.find(t => t.id === selectedTraineeId);
  const qrUrl = selectedTraineeId ? getQRUrl(selectedTraineeId) : '';

  const handleDownload = () => {
    if (!qrUrl) return;
    
    const svg = document.getElementById('qr-code-svg');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      
      const downloadLink = document.createElement('a');
      downloadLink.download = `qr-code-${selectedTrainee?.name || 'trainee'}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <QrCode className="w-6 h-6 text-indigo-600" />
            QR код для добавления
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Выберите спортсмена
            </label>
            <select
              value={selectedTraineeId}
              onChange={(e) => setSelectedTraineeId(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
            >
              <option value="">Выберите из списка</option>
              {allAvailableTrainees.map((trainee) => (
                <option key={trainee.id} value={trainee.id}>
                  {trainee.name} ({trainee.email})
                </option>
              ))}
            </select>
          </div>

          {selectedTraineeId && qrUrl && (
            <div className="flex flex-col items-center space-y-4 pt-4 border-t">
              <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
                <QRCodeSVG
                  id="qr-code-svg"
                  value={qrUrl}
                  size={256}
                  level="H"
                  includeMargin={true}
                />
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">
                  Спортсмен: <span className="font-semibold">{selectedTrainee?.name}</span>
                </p>
                <p className="text-xs text-gray-500 break-all">{qrUrl}</p>
              </div>
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                Скачать QR код
              </button>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Закрыть
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

