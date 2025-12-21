import React, { useState, useEffect, useCallback } from 'react';
import imageCompression from 'browser-image-compression';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UploadCloud,
  Download,
  Settings2,
  Image as ImageIcon,
  RefreshCw,
  CheckCircle2,
  FileType,
  Maximize2,
  Save,
  ArrowRight
} from 'lucide-react';

const ImageCompressor = () => {
  const [file, setFile] = useState(null);
  const [originalPreview, setOriginalPreview] = useState(null);
  const [compressedFile, setCompressedFile] = useState(null);
  const [compressedPreview, setCompressedPreview] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [mode, setMode] = useState('manual');

  const [settings, setSettings] = useState({
    maxSizeMB: 1,
    quality: 0.9,
    maxWidth: 0,
    fileType: 'image/jpeg',
    fileName: ''
  });

  // --- Helpers ---
  const formatBytes = (bytes) => {
    if (bytes === 0 || !bytes) return '0 Bytes';
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // --- Handlers ---
  const handleUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (originalPreview) URL.revokeObjectURL(originalPreview);
    if (compressedPreview) URL.revokeObjectURL(compressedPreview);

    setFile(selectedFile);
    setOriginalPreview(URL.createObjectURL(selectedFile));
    setCompressedFile(null);
    setCompressedPreview(null);

    const nameWithoutExt = selectedFile.name.split('.').slice(0, -1).join('.');
    setSettings(prev => ({ ...prev, fileName: nameWithoutExt }));
  };

  const processImage = useCallback(async () => {
    if (!file) return;
    setIsProcessing(true);

    // Simulate a small delay for animation smoothness
    await new Promise(resolve => setTimeout(resolve, 300));

    try {
      let options = {
        useWebWorker: true,
        fileType: settings.fileType,
        maxWidthOrHeight: settings.maxWidth > 0 ? settings.maxWidth : undefined,
        alwaysKeepResolution: settings.maxWidth === 0,
      };

      if (mode === 'auto') {
        options.maxSizeMB = settings.maxSizeMB;
        options.initialQuality = 1.0;
      } else {
        options.maxSizeMB = 1000;
        options.initialQuality = settings.quality;
      }

      const compressedBlob = await imageCompression(file, options);
      setCompressedFile(compressedBlob);

      const newUrl = URL.createObjectURL(compressedBlob);
      setCompressedPreview(old => {
        if (old) URL.revokeObjectURL(old);
        return newUrl;
      });

    } catch (error) {
      console.error("Compression error:", error);
    } finally {
      setIsProcessing(false);
    }
  }, [file, settings, mode]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (file) processImage();
    }, 600); // Slightly longer debounce for smoother UX
    return () => clearTimeout(timer);
  }, [processImage]);

  const handleDownload = () => {
    if (!compressedFile) return;
    const link = document.createElement('a');
    link.href = compressedPreview;
    const ext = settings.fileType.split('/')[1];
    link.download = `${settings.fileName || 'compressed'}.${ext}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // --- Animations ---
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4 font-sans text-slate-800">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-6xl mx-auto"
      >

        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center justify-center p-3 bg-white rounded-2xl shadow-sm mb-4"
          >
            <ImageIcon className="w-8 h-8 text-indigo-600 mr-2" />
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Pixel<span className="text-indigo-600">Perfect</span></h1>
          </motion.div>
          <p className="text-slate-500 text-lg">Intelligent compression with total manual control.</p>
        </div>

        {/* Upload Area */}
        <AnimatePresence mode="wait">
          {!file ? (
            <motion.div
              key="upload"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-2xl mx-auto"
            >
              <label className="group flex flex-col items-center justify-center w-full h-80 border-3 border-dashed border-indigo-200 rounded-3xl cursor-pointer bg-white hover:bg-indigo-50/50 hover:border-indigo-400 transition-all duration-300 relative overflow-hidden shadow-sm hover:shadow-md">
                <div className="absolute inset-0 bg-grid-indigo-500/[0.05] [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]"></div>
                <div className="flex flex-col items-center justify-center pt-5 pb-6 z-10">
                  <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <UploadCloud className="w-10 h-10 text-indigo-600" />
                  </div>
                  <p className="mb-2 text-xl font-semibold text-slate-700">Drop your image here</p>
                  <p className="text-sm text-slate-400">Supports PNG, JPG, WEBP up to 50MB</p>
                </div>
                <input type="file" className="hidden" accept="image/*" onChange={handleUpload} />
              </label>
            </motion.div>
          ) : (
            <motion.div
              key="workspace"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >

              {/* --- LEFT: Controls Panel --- */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-white">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                      <Settings2 className="w-5 h-5 text-indigo-600" />
                      <h3 className="font-bold text-lg text-slate-800">Configuration</h3>
                    </div>
                    <button
                      onClick={() => window.location.reload()}
                      className="p-2 hover:bg-red-50 text-red-500 rounded-full transition-colors"
                      title="Reset"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Mode Toggles */}
                  <div className="grid grid-cols-2 bg-slate-100 p-1.5 rounded-xl mb-8">
                    {['auto', 'manual'].map((m) => (
                      <button
                        key={m}
                        onClick={() => setMode(m)}
                        className={`py-2.5 text-sm font-bold rounded-lg transition-all duration-200 capitalize ${
                          mode === m
                            ? 'bg-white text-indigo-600 shadow-sm'
                            : 'text-slate-500 hover:text-slate-700'
                        }`}
                      >
                        {m} Mode
                      </button>
                    ))}
                  </div>

                  {/* Dynamic Settings */}
                  <div className="space-y-6">
                    {/* Filename */}
                    <div className="group">
                      <label className="flex items-center text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                        <Save className="w-3 h-3 mr-1" /> Filename
                      </label>
                      <input
                        type="text"
                        value={settings.fileName}
                        onChange={(e) => setSettings({...settings, fileName: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 block p-3 transition-all"
                        placeholder="file-name"
                      />
                    </div>

                    {/* Main Slider */}
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      {mode === 'auto' ? (
                        <>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-semibold text-slate-700">Size Limit</span>
                            <span className="text-indigo-600 font-mono font-bold text-sm">
                              {settings.maxSizeMB < 1 ? (settings.maxSizeMB * 1024).toFixed(0) + ' KB' : settings.maxSizeMB + ' MB'}
                            </span>
                          </div>
                          <input
                            type="range" min="0.01" max="5" step="0.01"
                            value={settings.maxSizeMB}
                            onChange={(e) => setSettings({...settings, maxSizeMB: parseFloat(e.target.value)})}
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                          />
                        </>
                      ) : (
                        <>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-semibold text-slate-700">Quality Level</span>
                            <span className="text-indigo-600 font-mono font-bold text-sm">
                              {Math.round(settings.quality * 100)}%
                            </span>
                          </div>
                          <input
                            type="range" min="0.01" max="1.0" step="0.01"
                            value={settings.quality}
                            onChange={(e) => setSettings({...settings, quality: parseFloat(e.target.value)})}
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                          />
                        </>
                      )}
                    </div>

                    {/* Advanced Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="flex items-center text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                           Width <span className="ml-1 text-[10px] lowercase font-normal">(0=orig)</span>
                        </label>
                        <div className="relative">
                          <Maximize2 className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                          <input
                            type="number"
                            value={settings.maxWidth}
                            onChange={(e) => setSettings({...settings, maxWidth: parseInt(e.target.value)})}
                            className="w-full pl-9 bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl p-2.5 focus:ring-indigo-500 outline-none"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="flex items-center text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                          <FileType className="w-3 h-3 mr-1" /> Format
                        </label>
                        <select
                          value={settings.fileType}
                          onChange={(e) => setSettings({...settings, fileType: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl p-2.5 focus:ring-indigo-500 outline-none"
                        >
                          <option value="image/jpeg">JPEG</option>
                          <option value="image/png">PNG</option>
                          <option value="image/webp">WebP</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* --- RIGHT: Preview Area --- */}
              <div className="lg:col-span-8 flex flex-col gap-6">

                {/* Comparison Card */}
                <div className="flex-1 bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-white overflow-hidden flex flex-col relative">

                  {/* Progress Overlay */}
                  <AnimatePresence>
                    {isProcessing && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-20 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center"
                      >
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full mb-4"
                        />
                        <p className="font-semibold text-indigo-600 animate-pulse">Optimizing pixels...</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Header */}
                  <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                     <div className="flex items-center gap-2">
                       <span className="flex items-center gap-2 text-xs font-bold text-slate-500 bg-white border border-slate-200 px-3 py-1 rounded-full">
                         ORIGINAL: <span className="text-slate-800">{formatBytes(file.size)}</span>
                       </span>
                       <ArrowRight className="w-4 h-4 text-slate-400" />
                       <span className="flex items-center gap-2 text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">
                         RESULT: {compressedFile ? formatBytes(compressedFile.size) : '...'}
                       </span>
                     </div>
                     {compressedFile && (
                       <span className={`text-xs font-bold px-2 py-1 rounded ${compressedFile.size > file.size ? 'text-red-500 bg-red-50' : 'text-emerald-600 bg-emerald-50'}`}>
                         {((compressedFile.size - file.size) / file.size * 100).toFixed(0)}%
                       </span>
                     )}
                  </div>

                  {/* Images Split */}
                  <div className="flex-1 grid grid-cols-2 divide-x divide-slate-100 min-h-[400px]">
                    {/* Original */}
                    <div className="relative p-6 flex items-center justify-center bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-slate-50">
                       <img src={originalPreview} className="max-w-full max-h-[350px] object-contain drop-shadow-lg rounded-lg" alt="Original" />
                       <div className="absolute bottom-4 left-4 bg-black/50 text-white text-[10px] px-2 py-1 rounded backdrop-blur-md">Original</div>
                    </div>

                    {/* Compressed */}
                    <div className="relative p-6 flex items-center justify-center bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-white">
                      {compressedPreview ? (
                         <img src={compressedPreview} className="max-w-full max-h-[350px] object-contain drop-shadow-lg rounded-lg" alt="Compressed" />
                      ) : (
                        <div className="text-slate-300">Waiting...</div>
                      )}
                      <div className="absolute bottom-4 left-4 bg-emerald-500/80 text-white text-[10px] px-2 py-1 rounded backdrop-blur-md">Compressed</div>
                    </div>
                  </div>

                  {/* Footer Action */}
                  <div className="p-6 border-t border-slate-100 bg-white">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleDownload}
                      disabled={!compressedFile || isProcessing}
                      className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-200 flex items-center justify-center gap-3 disabled:bg-slate-300 disabled:cursor-not-allowed disabled:shadow-none transition-all"
                    >
                      {isProcessing ? (
                        <>Processing...</>
                      ) : (
                        <>
                          <Download className="w-5 h-5" /> Download Optimized Image
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
    </div>
  );
};

export default ImageCompressor;
