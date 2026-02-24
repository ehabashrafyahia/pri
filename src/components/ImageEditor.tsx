import React, { useState, useRef } from 'react';
import { GoogleGenAI } from '@google/genai';
import { ImageIcon, Wand2, X, Upload, Loader2 } from 'lucide-react';

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY });

export default function ImageEditor() {
  const [isOpen, setIsOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
        setResultImage(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        const base64 = result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = error => reject(error);
    });
  };

  const handleEdit = async () => {
    if (!imageFile || !prompt) return;
    
    setIsProcessing(true);
    setError(null);
    
    try {
      const base64Data = await fileToBase64(imageFile);
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              inlineData: {
                data: base64Data,
                mimeType: imageFile.type,
              },
            },
            {
              text: prompt,
            },
          ],
        },
      });

      let foundImage = false;
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          const base64EncodeString = part.inlineData.data;
          setResultImage(`data:image/jpeg;base64,${base64EncodeString}`);
          foundImage = true;
          break;
        }
      }
      
      if (!foundImage) {
        setError("لم يتم العثور على صورة في الرد. حاول مرة أخرى.");
      }
      
    } catch (err: any) {
      console.error("Error editing image:", err);
      setError(err.message || "حدث خطأ أثناء تعديل الصورة.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-105 z-40"
        title="محرر الصور بالذكاء الاصطناعي"
      >
        <Wand2 size={28} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 font-cairo" dir="rtl">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-slate-800">
              <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                <Wand2 className="text-purple-400" size={32} />
                محرر الصور الذكي (Gemini)
              </h2>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors bg-slate-800 p-2 rounded-lg">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-8 flex flex-col gap-8">
              {!imagePreview ? (
                <div 
                  className="border-2 border-dashed border-slate-600 rounded-2xl p-16 flex flex-col items-center justify-center text-slate-400 hover:bg-slate-800 hover:border-purple-500 transition-colors cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload size={64} className="mb-6 text-slate-500" />
                  <p className="text-2xl font-medium mb-3">اضغط لرفع صورة</p>
                  <p className="text-lg text-slate-500">JPG, PNG, WEBP</p>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>
              ) : (
                <div className="flex flex-col gap-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-3">
                      <span className="text-slate-300 font-medium text-xl">الصورة الأصلية:</span>
                      <div className="relative rounded-2xl overflow-hidden bg-slate-800 border-2 border-slate-700 aspect-square flex items-center justify-center">
                        <img src={imagePreview} alt="Original" className="max-w-full max-h-full object-contain" />
                        <button 
                          onClick={() => {
                            setImageFile(null);
                            setImagePreview(null);
                            setResultImage(null);
                          }}
                          className="absolute top-4 right-4 bg-black/60 text-white p-2 rounded-xl hover:bg-red-600 transition-colors"
                        >
                          <X size={20} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-3">
                      <span className="text-slate-300 font-medium text-xl">النتيجة:</span>
                      <div className="relative rounded-2xl overflow-hidden bg-slate-800 border-2 border-slate-700 aspect-square flex items-center justify-center">
                        {isProcessing ? (
                          <div className="flex flex-col items-center text-purple-400">
                            <Loader2 size={48} className="animate-spin mb-4" />
                            <span className="text-xl">جاري المعالجة...</span>
                          </div>
                        ) : resultImage ? (
                          <img src={resultImage} alt="Result" className="max-w-full max-h-full object-contain" />
                        ) : (
                          <div className="text-slate-500 flex flex-col items-center">
                            <ImageIcon size={48} className="mb-4 opacity-50" />
                            <span className="text-xl">ستظهر النتيجة هنا</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-4 bg-slate-800 p-6 rounded-2xl border border-slate-700">
                    <label className="text-slate-300 font-medium text-xl">ماذا تريد أن تفعل بالصورة؟</label>
                    <div className="flex flex-col md:flex-row gap-4">
                      <input 
                        type="text" 
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="مثال: أضف فلتر قديم، احذف الشخص في الخلفية..."
                        className="flex-1 bg-slate-900 border-2 border-slate-600 rounded-xl px-6 py-4 text-white text-xl focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleEdit();
                        }}
                      />
                      <button 
                        onClick={handleEdit}
                        disabled={isProcessing || !prompt}
                        className="bg-purple-600 hover:bg-purple-700 disabled:bg-slate-700 disabled:text-slate-500 text-white px-8 py-4 rounded-xl text-xl font-bold transition-colors flex items-center justify-center gap-3"
                      >
                        {isProcessing ? <Loader2 className="animate-spin" size={24} /> : <Wand2 size={24} />}
                        تعديل
                      </button>
                    </div>
                    {error && (
                      <p className="text-red-400 text-lg mt-2">{error}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
