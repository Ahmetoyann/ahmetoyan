// src/admin_panel_page.js
import { useState } from 'react';

const SECTIONS = [
  { id: 'nav', title: 'Navigasyon', keys: ['navHome', 'navAbout', 'navExp', 'navVol', 'navProj', 'navContact'] },
  { id: 'header', title: 'Üst Bilgi', keys: ['headerTitle', 'profileImg'] },
  { id: 'about', title: 'Hakkımda', keys: ['aboutTitle', 'aboutText', 'eduTitle', 'uni1', 'dept', 'uni2', 'gpa', 'skillsTitle', 'skillsList', 'langTitle', 'langList'] },
  { id: 'experience', title: 'Deneyim', keys: ['expTitle', 'jobs'] },
  { id: 'volunteering', title: 'Gönüllülük', keys: ['volTitle', 'volJobs'] },
  { id: 'projects', title: 'Projeler', keys: ['projTitle', 'projects'] },
  { id: 'contact', title: 'İletişim', keys: ['contactTitle', 'copyright', 'modalTitle', 'formName', 'formEmail', 'formMsg', 'formBtn', 'phName', 'phEmail', 'phMsg'] }
];

export default function AdminPanel({ content, setContent, defaultContent, currentLanguage, darkMode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [editingLang, setEditingLang] = useState(currentLanguage || 'tr');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [notification, setNotification] = useState(null);
  const [confirmModal, setConfirmModal] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Bildirim Gösterme
  const showToast = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Onay İsteme
  const requestConfirm = (message, onConfirm) => {
    setConfirmModal({ message, onConfirm });
  };

  // Admin Giriş Fonksiyonu
  const handleAdminLogin = () => {
    setShowLoginModal(true);
  };

  // Şifre Kontrolü
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (passwordInput === "142163") { 
      setIsAdmin(true);
      setShowLoginModal(false);
      setPasswordInput("");
      setLoginError(false);
      openAdminPanel();
    } else {
      setLoginError(true);
    }
  };

  // Admin Panelini Aç
  const openAdminPanel = () => {
    setEditingLang(currentLanguage);
    setEditData(JSON.parse(JSON.stringify(content[currentLanguage]))); // Veriyi kopyala
    setShowAdminModal(true);
  };

  // Değişiklikleri Kaydet
  const handleSaveContent = () => {
    try {
      const newContent = { ...content, [editingLang]: editData };
      setContent(newContent);
      localStorage.setItem('siteContent', JSON.stringify(newContent));
      showToast("Değişiklikler başarıyla kaydedildi!", "success");
      setShowAdminModal(false);
    } catch (error) {
      showToast("Hata oluştu: " + error.message, "error");
    }
  };

  // Varsayılanlara Dön
  const handleResetContent = () => {
    requestConfirm("Tüm değişiklikleri silip varsayılan ayarlara dönmek istediğinize emin misiniz?", () => {
      setContent(defaultContent);
      localStorage.removeItem('siteContent');
      setEditData(JSON.parse(JSON.stringify(defaultContent[editingLang])));
      setShowAdminModal(false);
      showToast("Varsayılan ayarlara dönüldü.", "success");
    });
  };

  // Değişiklikleri Geri Al (Kaydedilmemiş değişiklikleri iptal et)
  const handleUndoChanges = () => {
    requestConfirm("Kaydedilmemiş değişiklikleri geri almak istediğinize emin misiniz?", () => {
      setEditData(JSON.parse(JSON.stringify(content[editingLang])));
      showToast("Değişiklikler geri alındı.", "success");
    });
  };

  // Kapatma işlemi (Değişiklik kontrolü)
  const handleClose = () => {
    const hasChanges = JSON.stringify(content[editingLang]) !== JSON.stringify(editData);
    if (hasChanges) {
      requestConfirm("Kaydedilmemiş değişiklikler var. Çıkmak istediğinize emin misiniz?", () => {
        setShowAdminModal(false);
      });
    } else {
      setShowAdminModal(false);
    }
  };

  // Çıkış Yapma Fonksiyonu
  const handleLogout = () => {
    setIsAdmin(false);
    setShowAdminModal(false);
  };

  // Resim dosyasını Base64 formatına çevir
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  // Resim yükleme işlemi
  const handleImageChange = async (e, key, index = null, subKey = null) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const base64 = await convertToBase64(file);
      if (index !== null && subKey !== null) {
        // Liste içindeki obje güncellemesi (Örn: Projeler)
        const newList = [...editData[key]];
        newList[index] = { ...newList[index], [subKey]: base64 };
        setEditData({ ...editData, [key]: newList });
      } else {
        // Düz alan güncellemesi
        setEditData({ ...editData, [key]: base64 });
      }
    } catch (error) {
      console.error("Resim dönüştürme hatası:", error);
      showToast("Resim yüklenirken bir hata oluştu.", "error");
    }
  };

  // Tek bir alan için input oluşturma
  const renderField = (key, value) => {
    if (value === undefined) return null;
    
      // 1. Düz Metinler (String)
      if (typeof value === 'string') {
        const isLongText = value.length > 50 || key.includes('Text') || key.includes('desc');
        const isImage = /img|image|src|url|photo|pic/i.test(key);

        return (
          <div key={key} className="admin-form-group">
            <label>{key}</label>
            {isLongText ? (
              <textarea
                value={value}
                onChange={(e) => setEditData({ ...editData, [key]: e.target.value })}
                className="form-textarea"
                rows={3}
              />
            ) : (
              <input
                type="text"
                value={value}
                onChange={(e) => setEditData({ ...editData, [key]: e.target.value })}
                className="form-input"
              />
            )}
            {isImage && (
              <div className="admin-image-upload">
                {value && (
                  <div className="admin-image-preview">
                    <img src={value} alt={key} />
                  </div>
                )}
                <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, key)} className="admin-file-input" />
                <small>Bilgisayarınızdan yeni bir resim seçebilirsiniz.</small>
              </div>
            )}
          </div>
        );
      } 
      // 2. Listeler (Array)
      else if (Array.isArray(value)) {
        // 2a. Metin Listeleri (Örn: Yetenekler, Diller)
        if (value.length > 0 && typeof value[0] === 'string') {
          return (
            <div key={key} className="admin-form-group">
              <label>{key} (Her satıra bir madde)</label>
              <textarea
                value={value.join('\n')}
                onChange={(e) => {
                  const list = e.target.value.split('\n');
                  setEditData({ ...editData, [key]: list });
                }}
                className="form-textarea"
                rows={5}
              />
            </div>
          );
        } 
        // 2b. Obje Listeleri (Örn: Deneyimler, Projeler)
        else if (value.length > 0 && typeof value[0] === 'object') {
          return (
            <div key={key} className="admin-form-group-section">
              <h3 style={{borderBottom: '1px solid #ccc', paddingBottom: '5px'}}>{key}</h3>
              {value.map((item, index) => (
                <div key={index} className="admin-sub-group">
                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <h4>#{index + 1}</h4>
                    <div style={{ display: 'flex', gap: '5px' }}>
                      <button 
                        className="move-btn"
                        disabled={index === 0}
                        onClick={() => {
                          const newList = [...value];
                          [newList[index - 1], newList[index]] = [newList[index], newList[index - 1]];
                          setEditData({ ...editData, [key]: newList });
                        }}
                        title="Yukarı Taşı"
                      >
                        ⬆️
                      </button>
                      <button 
                        className="move-btn"
                        disabled={index === value.length - 1}
                        onClick={() => {
                          const newList = [...value];
                          [newList[index + 1], newList[index]] = [newList[index], newList[index + 1]];
                          setEditData({ ...editData, [key]: newList });
                        }}
                        title="Aşağı Taşı"
                      >
                        ⬇️
                      </button>
                      <button className="delete-btn" onClick={() => {
                          const newList = value.filter((_, i) => i !== index);
                          setEditData({ ...editData, [key]: newList });
                      }}>Sil</button>
                    </div>
                  </div>
                  {Object.keys(item).map((subKey) => {
                    const isSubImage = /img|image|src|url|photo|pic/i.test(subKey);
                    return (
                    <div key={subKey} className="admin-form-group">
                      <label>{subKey}</label>
                      {(subKey === 'desc' || subKey === 'description' || (typeof item[subKey] === 'string' && item[subKey].length > 50)) ? (
                        <textarea
                          value={item[subKey]}
                          onChange={(e) => {
                            const newList = [...value];
                            newList[index] = { ...newList[index], [subKey]: e.target.value };
                            setEditData({ ...editData, [key]: newList });
                          }}
                          className="form-textarea"
                          rows={3}
                        />
                      ) : (
                        <input
                          type="text"
                          value={item[subKey]}
                          onChange={(e) => {
                            const newList = [...value];
                            newList[index] = { ...newList[index], [subKey]: e.target.value };
                            setEditData({ ...editData, [key]: newList });
                          }}
                          className="form-input"
                        />
                      )}
                      {isSubImage && (
                        <div className="admin-image-upload">
                          {item[subKey] && (
                            <div className="admin-image-preview">
                              <img src={item[subKey]} alt={subKey} />
                            </div>
                          )}
                          <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, key, index, subKey)} className="admin-file-input" />
                        </div>
                      )}
                    </div>
                    );
                  })}
                </div>
              ))}
              <button className="add-btn" onClick={() => {
                  // İlk öğenin yapısını kopyala ama içini boşalt
                  const template = value.length > 0 ? Object.keys(value[0]).reduce((acc, k) => ({...acc, [k]: ""}), {}) : {};
                  setEditData({ ...editData, [key]: [...value, template] });
              }}>+ Yeni Ekle</button>
            </div>
          );
        }
      }
  };

  return (
    <>
      {/* Bildirim Toast */}
      {notification && (
        <div className={`admin-toast ${notification.type}`}>
          {notification.message}
        </div>
      )}

      {/* Onay Modalı */}
      {confirmModal && (
        <div className="confirm-modal-overlay">
          <div className="confirm-modal-content">
            <h3>Onay Gerekiyor</h3>
            <p>{confirmModal.message}</p>
            <div className="confirm-buttons">
              <button className="btn-confirm-yes" onClick={() => {
                confirmModal.onConfirm();
                setConfirmModal(null);
              }}>Evet</button>
              <button className="btn-confirm-no" onClick={() => setConfirmModal(null)}>Hayır</button>
            </div>
          </div>
        </div>
      )}

      {/* Login Modalı */}
      {showLoginModal && (
        <div className="admin-modal-overlay">
          <div className="login-modal-content">
            <button className="admin-modal-close-button" onClick={() => {
                setShowLoginModal(false);
                setPasswordInput("");
                setLoginError(false);
            }}>
              &times;
            </button>
            <h3 style={{marginTop: 0, marginBottom: '20px', textAlign: 'center'}}>Admin Girişi</h3>
            <form onSubmit={handleLoginSubmit}>
                <div className="admin-form-group">
                    <input 
                        type="password" 
                        placeholder="Şifre"
                        className={`form-input ${loginError ? 'input-error' : ''}`} 
                        value={passwordInput} 
                        onChange={(e) => {
                          setPasswordInput(e.target.value);
                          setLoginError(false);
                        }}
                        style={{width: '100%', boxSizing: 'border-box'}}
                        autoFocus
                    />
                </div>
                <button type="submit" className="form-submit-btn" style={{width: '100%', marginTop: '10px'}}>Giriş Yap</button>
            </form>
          </div>
        </div>
      )}

      {/* Admin Modalı */}
      {showAdminModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <button className="admin-sidebar-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                ☰
            </button>
            <button className="admin-modal-close-button" onClick={handleClose}>
              &times;
            </button>
            <h2>Admin Paneli</h2>
            <div className="admin-controls">
                <label htmlFor="languageSelect">Dil Seçin:</label>
                <select
                  id="languageSelect"
                  value={editingLang}
                  onChange={(e) => {
                    const newLang = e.target.value;
                    setEditingLang(newLang);
                    setEditData(JSON.parse(JSON.stringify(content[newLang])));
                  }}
                >
                  <option value="tr">Türkçe</option>
                  <option value="en">English</option>
                </select>
            </div>
            
            <div className="admin-body">
              {/* Mobile Overlay */}
              <div 
                className={`admin-sidebar-overlay ${isSidebarOpen ? 'open' : ''}`} 
                onClick={() => setIsSidebarOpen(false)}
              ></div>

              {/* Sidebar Menü */}
              <div className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}>
                {SECTIONS.map(section => (
                  <a 
                    key={section.id} 
                    href={`#admin-section-${section.id}`} 
                    className="admin-sidebar-link"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(`admin-section-${section.id}`)?.scrollIntoView({ behavior: 'smooth' });
                      setIsSidebarOpen(false);
                    }}
                  >
                    {section.title}
                  </a>
                ))}
                {/* Diğer (Tanımsız) Alanlar İçin Link */}
                {editData && Object.keys(editData).some(k => !SECTIONS.flatMap(s => s.keys).includes(k)) && (
                   <a 
                    href="#admin-section-other" 
                    className="admin-sidebar-link"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(`admin-section-other`)?.scrollIntoView({ behavior: 'smooth' });
                      setIsSidebarOpen(false);
                    }}
                  >
                    Diğer 
                  </a>
                )}
              </div>

              {/* İçerik Alanı */}
              <div className="admin-content-area">
                {editData && SECTIONS.map(section => (
                  <div key={section.id} id={`admin-section-${section.id}`} className="admin-section-container">
                    <h3 className="admin-section-title">{section.title}</h3>
                    {section.keys.map(key => renderField(key, editData[key]))}
                  </div>
                ))}
                {/* Diğer (Tanımsız) Alanlar */}
                {editData && Object.keys(editData).filter(k => !SECTIONS.flatMap(s => s.keys).includes(k)).length > 0 && (
                  <div id="admin-section-other" className="admin-section-container">
                    <h3 className="admin-section-title">Diğer</h3>
                    {Object.keys(editData).filter(k => !SECTIONS.flatMap(s => s.keys).includes(k)).map(key => renderField(key, editData[key]))}
                  </div>
                )}
              </div>
            </div>
            <div className="admin-modal-buttons">
              <button className="btn-save" onClick={handleSaveContent}>Kaydet</button>
              <button className="btn-undo" onClick={handleUndoChanges}>Geri Al</button>
              <button className="btn-reset" onClick={handleResetContent}>Varsayılana Dön</button>
              <button className="btn-close" onClick={handleClose}>Kapat</button>
            </div>
          </div>
        </div>
      )}

      {/* Admin Butonları */}
      <div style={{
        position: 'fixed',
        bottom: '10px',
        left: '10px',
        display: 'flex',
        gap: '10px',
        zIndex: 1000
      }}>
        <button 
          onClick={isAdmin ? openAdminPanel : handleAdminLogin}
          style={{
            opacity: 0.5,
            fontSize: '0.8rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: darkMode ? '#555' : '#ccc'
          }}
        >
          {isAdmin ? 'Admin Paneli' : 'Admin'}
        </button>
        {isAdmin && (
          <button 
            onClick={handleLogout}
            style={{
              opacity: 0.5,
              fontSize: '0.8rem',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: darkMode ? '#555' : '#ccc'
            }}
          >
            Cıkıs Yap
          </button>
        )}
      </div>
    </>
  );
}
