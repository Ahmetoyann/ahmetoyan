import { useState, useEffect } from 'react';
import profilePic from './image/VesikalıkFotoğraf.jpeg';
import './styles.css';

function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [language, setLanguage] = useState('en');
  const [menuOpen, setMenuOpen] = useState(false);

  const translations = {
    tr: {
      navHome: "Ana Sayfa",
      navAbout: "Hakkımda",
      navExp: "Deneyim",
      navVol: "Gönüllülük",
      navProj: "Projeler",
      navContact: "İletişim",
      headerTitle: "Bilgisayar Mühendisliği Öğrencisi",
      aboutTitle: "Hakkımda",
      aboutText: "Bilgisayar Mühendisliği öğrencisi olarak özellikle mobil uygulama geliştirme alanında kendimi geliştirmeye odaklanmış, öğrenmeye açık ve güçlü bir problem çözme yaklaşımına sahip biriyim. Yeni teknolojileri hızlıca kavrayabilen, azimli ve yüksek motivasyonla çalışan biri olarak ekip çalışmalarına uyum sağlayacağıma inanıyorum.",
      eduTitle: "Eğitim",
      uni1: "Balıkesir Üniversitesi",
      dept: "Bilgisayar Mühendisliği Bölümü",
      uni2: "Harran Üniversitesi",
      gpa: "Not Ortalaması : 2.44/4.00",
      skillsTitle: "Uzmanlık Alanları",
      skillsList: ["Flutter&Mobil Uygulama Geliştirme (Flutter, Dart)", "Web Geliştirme (React, javascript, HTML, CSS, Node.js)", "Veritabanı Yönetimi (Firebase)"],
      langTitle: "Diller",
      langList: ["Türkçe (Anadil)", "İngilizce (Temel Seviye)", "Arapca (Temel Seviye)"],
      expTitle: "Deneyim",
      jobs: [
        { title: "TeknoAI-T", details: "Uzaktan Çalışan | Ocak 2026 - Hala Çalışıyor", desc: "TeknoAI-T’de çalışmaya başladım ve teknoloji odaklı projelerde öğrenme isteğimle hızlı şekilde katkı sağlamaya odaklanıyorum." },
        { title: "İşkur Gençlik Programı", details: "Tam Zamanlı Çalışan | Mart 2025 - Temmuz 2025", desc: "Balıkesir Üniversitesi rektörlüğünde bulunan Bilgi İşlem Daire Başkanlığında tam zamanlı olarak görev yaptım.\nBu sayede web sitesi ile alakalı çeşitli deneyimler kazandım." }
      ],
      volTitle: "Gönüllülük",
      volJobs: [
        { title: "T3 Vakfı", details: "Gönüllü | Eyl 2025 - Halen", desc: "Şanlıurfa T3 Vakfında gönüllü olarak çalışmaktayım." }
      ],
      projTitle: "Öne Çıkan Projeler",
      projects: [
        {
          id: 1,
          title: "Pazaryeri (Flutter)",
          description: "Semt pazarları, ürün arama ve doluluk yönetimi sağlayan mobil uygulama. MVVM mimarisi, Provider, Firebase Auth/Firestore ve Konum servisleri kullanılarak geliştirilmiştir.",
          githubLink: "https://github.com/Ahmetoyann/Pazaryeri"
        },
        {
          id: 2,
          title: "OYN Music (Flutter)",
          description: "Müzik dinleyip keşfedebileceğiniz, modern ve kullanıcı dostu bir müzik çalma uygulaması. Trendler, gelişmiş arama, arka planda çalma, favoriler, çalma listeleri, bulut senkronizasyonu ve kişiselleştirme gibi özellikler sunar. Flutter, Firebase Auth/Firestore, Provider, just_audio & audio_service, Jamendo API ve shared_preferences kullanılarak geliştirilmiştir.",
          githubLink: "https://github.com/Ahmetoyann/oynmusic"
        }
      ],
      contactTitle: "İletişime Geçin",
      copyright: "Tüm Hakları Saklıdır.",
      modalTitle: "İletişime Geçin",
      formName: "Ad Soyad",
      formEmail: "E-posta",
      formMsg: "Mesaj",
      formBtn: "Gönder",
      phName: "Adınız Soyadınız",
      phEmail: "ornek@email.com",
      phMsg: "Mesajınız..."
    },
    en: {
      navHome: "Home",
      navAbout: "About",
      navExp: "Experience",
      navVol: "Volunteering",
      navProj: "Projects",
      navContact: "Contact",
      headerTitle: "Computer Engineering Student",
      aboutTitle: "About Me",
      aboutText: "As a Computer Engineering student, I am focused on improving myself in mobile application development, open to learning, and have a strong problem-solving approach. I believe I will adapt to team work as someone who can grasp new technologies quickly, works with determination and high motivation.",
      eduTitle: "Education",
      uni1: "Balikesir University",
      dept: "Computer Engineering Department",
      uni2: "Harran University",
      gpa: "GPA : 2.44/4.00",
      skillsTitle: "Skills",
      skillsList: ["Flutter & Mobile App Development (Flutter, Dart)", "Web Development (React, javascript, HTML, CSS, Node.js)", "Database Management (Firebase)"],
      langTitle: "Languages",
      langList: ["Turkish (Native)", "English (Basic Level)", "Arabic (Basic Level)"],
      expTitle: "Experience",
      jobs: [
        { title: "TeknoAI-T", details: "Remote | Jan 2026 - Present", desc: "I started working at TeknoAI-T and I'm focused on quickly contributing to technology-oriented projects with my eagerness to learn." },
        { title: "Iskur Youth Program", details: "Full Time | Mar 2025 - Jul 2025", desc: "I worked full time at the IT Department of Balikesir University Rectorate.\nThanks to this, I gained various experiences related to websites." }
      ],
      volTitle: "Volunteering",
      volJobs: [
        { title: "T3 Foundation", details: "Volunteer | Sep 2025 - Present", desc: "I work as a volunteer at the Şanlıurfa T3 Foundation." }
      ],
      projTitle: "Featured Projects",
      projects: [
        {
          id: 1,
          title: "Pazaryeri (Flutter)",
          description: "Mobile application providing neighborhood markets, product search and occupancy management. Developed using MVVM architecture, Provider, Firebase Auth/Firestore and Location services.",
          githubLink: "https://github.com/Ahmetoyann/Pazaryeri"
        },
        {
          id: 2,
          title: "OYN Music (Flutter)",
          description: "A modern and user-friendly music player application where you can listen to and discover music. Offers features such as trends, advanced search, background playback, favorites, playlists, cloud synchronization, and personalization. Developed using Flutter, Firebase Auth/Firestore, Provider, just_audio & audio_service, Jamendo API, and shared_preferences.",
          githubLink: "https://github.com/Ahmetoyann/oynmusic"
        }
      ],
      contactTitle: "Get in Touch",
      copyright: "All Rights Reserved.",
      modalTitle: "Get in Touch",
      formName: "Name Surname",
      formEmail: "Email",
      formMsg: "Message",
      formBtn: "Send",
      phName: "Your Name",
      phEmail: "example@email.com",
      phMsg: "Your message..."
    }
  };

  const t = translations[language];
  const projects = t.projects;

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container">
      <style>{`
        .hamburger-btn {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 1002;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 10px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .hamburger-btn span {
          display: block;
          width: 30px;
          height: 3px;
          background-color: #333;
          border-radius: 3px;
          transition: all 0.3s ease;
        }
        .dark-mode .hamburger-btn span {
          background-color: #fff;
        }
        .hamburger-btn.open span:nth-child(1) {
          transform: rotate(45deg) translate(7px, 6px);
        }
        .hamburger-btn.open span:nth-child(2) {
          opacity: 0;
        }
        .hamburger-btn.open span:nth-child(3) {
          transform: rotate(-45deg) translate(7px, -6px);
        }
        
        .navbar {
          position: fixed;
          top: 0;
          right: -300px;
          width: 250px;
          height: 100vh;
          background-color: rgba(255, 255, 255, 0.98);
          box-shadow: -2px 0 10px rgba(0,0,0,0.1);
          transition: right 0.3s ease;
          z-index: 1001;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 20px;
        }
        .dark-mode .navbar {
          background-color: rgba(30, 30, 30, 0.98);
        }
        .navbar.open {
          right: 0;
        }
        .nav-list {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 25px;
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .nav-link {
          text-decoration: none;
          color: #333;
          font-size: 1.2rem;
          font-weight: 500;
          position: relative;
          transition: color 0.3s ease;
        }
        .dark-mode .nav-link {
          color: #f0f0f0;
        }
        .nav-link:hover {
          color: #007bff;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -5px;
          left: 0;
          background-color: #007bff;
          transition: width 0.3s ease;
        }
        .nav-link:hover::after {
          width: 100%;
        }
        .menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.5);
          z-index: 1000;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
          backdrop-filter: blur(5px);
          -webkit-backdrop-filter: blur(5px);
        }
        .menu-overlay.open {
          opacity: 1;
          visibility: visible;
        }

        /* Hakkımda Bölümü Kart Stilleri */
        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 25px;
          margin-top: 30px;
        }
        .info-item {
          background-color: #fff;
          border-radius: 15px;
          padding: 25px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border: 1px solid rgba(0,0,0,0.05);
          height: 100%;
        }
        .dark-mode .info-item {
          background-color: #2d2d2d;
          border-color: rgba(255,255,255,0.1);
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
        .info-item:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.2);
        }
        .info-item .subtitle {
          color: #007bff;
          border-bottom: 2px solid #eee;
          padding-bottom: 10px;
          margin-bottom: 15px;
        }

        /* Deneyim ve Gönüllülük Kart Stilleri */
        .experience-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 25px;
          margin-top: 30px;
        }
        .experience-item {
          background-color: #fff;
          border-radius: 15px;
          padding: 25px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border: 1px solid rgba(0,0,0,0.05);
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .dark-mode .experience-item {
          background-color: #2d2d2d;
          border-color: rgba(255,255,255,0.1);
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
        .experience-item:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.2);
        }
        .experience-item .job-title {
          color: #007bff;
          font-size: 1.3rem;
          margin-bottom: 5px;
          margin-top: 0;
        }
        .experience-item .job-details {
          font-size: 0.95rem;
          color: #666;
          margin-bottom: 15px;
          font-weight: 500;
          border-bottom: 1px solid #eee;
          padding-bottom: 10px;
        }
        .dark-mode .experience-item .job-details {
          color: #aaa;
          border-bottom-color: rgba(255,255,255,0.1);
        }

        /* Projeler Kart Stilleri */
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 25px;
          margin-top: 30px;
        }
        .project-card {
          background-color: #fff;
          border-radius: 15px;
          padding: 25px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border: 1px solid rgba(0,0,0,0.05);
          height: 100%;
          cursor: pointer;
          display: flex;
          flex-direction: column;
        }
        .dark-mode .project-card {
          background-color: #2d2d2d;
          border-color: rgba(255,255,255,0.1);
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
        .project-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.2);
        }
        .project-card h4 {
          color: #007bff;
          font-size: 1.3rem;
          margin-top: 0;
          margin-bottom: 10px;
        }
        .project-card p {
          color: #666;
          font-size: 0.95rem;
          line-height: 1.6;
        }
        .dark-mode .project-card p {
          color: #aaa;
        }

        /* İletişim Formu Stilleri */
        .form-group {
          margin-bottom: 20px;
        }
        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
          color: #555;
        }
        .dark-mode .form-group label {
          color: #ccc;
        }
        .form-input, .form-textarea {
          width: 100%;
          padding: 15px;
          border-radius: 15px;
          border: 1px solid rgba(0,0,0,0.1);
          background-color: #f9f9f9;
          font-size: 1rem;
          transition: all 0.3s ease;
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);
          font-family: inherit;
          box-sizing: border-box;
        }
        .dark-mode .form-input, .dark-mode .form-textarea {
          background-color: #333;
          border-color: rgba(255,255,255,0.1);
          color: #fff;
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.2);
        }
        .form-input:focus, .form-textarea:focus {
          outline: none;
          border-color: #007bff;
          background-color: #fff;
          box-shadow: 0 0 0 4px rgba(0,123,255,0.1);
        }
        .dark-mode .form-input:focus, .dark-mode .form-textarea:focus {
          background-color: #2d2d2d;
        }
        .form-submit-btn {
          background-color: #007bff;
          color: white;
          border: none;
          padding: 15px;
          border-radius: 15px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          width: 100%;
          box-shadow: 0 4px 10px rgba(0,123,255,0.2);
          margin-top: 10px;
        }
        .form-submit-btn:hover {
          background-color: #0056b3;
          transform: translateY(-3px);
          box-shadow: 0 6px 15px rgba(0,123,255,0.3);
        }

        /* Kart Başlıkları ve İkonlar */
        .card-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 15px;
          border-bottom: 2px solid #eee;
          padding-bottom: 10px;
        }
        .dark-mode .card-header {
          border-bottom-color: rgba(255,255,255,0.1);
        }
        .card-icon {
          font-size: 1.5rem;
          display: flex;
          align-items: center;
        }
        .info-item .subtitle, 
        .experience-item .job-title,
        .project-card h4 {
          border-bottom: none;
          padding-bottom: 0;
          margin-bottom: 0;
        }
      `}</style>
      
      {/* Overlay */}
      <div className={`menu-overlay ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(false)}></div>

      {/* Hamburger Button */}
      <button 
        className={`hamburger-btn ${menuOpen ? 'open' : ''}`} 
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Menüyü Aç/Kapat"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Navigasyon Menüsü */}
      <nav className={`navbar ${menuOpen ? 'open' : ''}`}>
        <ul className="nav-list">
          <li><a href="#home" className="nav-link" onClick={() => setMenuOpen(false)}>{t.navHome}</a></li>
          <li><a href="#about" className="nav-link" onClick={() => setMenuOpen(false)}>{t.navAbout}</a></li>
          <li><a href="#experience" className="nav-link" onClick={() => setMenuOpen(false)}>{t.navExp}</a></li>
          <li><a href="#volunteering" className="nav-link" onClick={() => setMenuOpen(false)}>{t.navVol}</a></li>
          <li><a href="#projects" className="nav-link" onClick={() => setMenuOpen(false)}>{t.navProj}</a></li>
          <li><a href="#contact" className="nav-link" onClick={() => setMenuOpen(false)}>{t.navContact}</a></li>
          <li>
            <button onClick={() => { setDarkMode(!darkMode); setMenuOpen(false); }} className="theme-btn" aria-label="Karanlık Modu Değiştir">
              {darkMode ? '☀️' : '🌙'}
            </button>
          </li>
          <li>
            <button onClick={() => { setLanguage(language === 'tr' ? 'en' : 'tr'); setMenuOpen(false); }} className="theme-btn" style={{ marginLeft: '10px', fontSize: '0.9rem', fontWeight: 'bold' }}>
              {language === 'tr' ? 'EN' : 'TR'}
            </button>
          </li>
        </ul>
      </nav>

      {/* Üst Kısım: Profil Fotoğrafı, İsim ve Bölüm */}
      <header id="home" className="header">
        <img 
          src={profilePic} 
          alt="Profil" 
          className="profile-img"
        />
        <h1 className="name">Ahmet Oyan</h1>
        <h2 className="title">{t.headerTitle}</h2>
      </header>

      {/* Hakkımda Kısmı */}
      <section id="about" className="section">
        <h3 className="section-title">{t.aboutTitle}</h3>
        <p className="about-text">{t.aboutText}</p>
        <div className="info-grid">
          <div className="info-item">
            <div className="card-header">
              <span className="card-icon">🎓</span>
              <h4 className="subtitle">{t.eduTitle}</h4>
            </div>
            <p><strong>{t.uni1}</strong></p>
            <p>{t.dept}</p>
            <p className="date">2024 - 2025</p>
            <br />
            <p><strong>{t.uni2}</strong></p>
            <p>{t.dept}</p>
            <p className="date">2025 - 2028</p>
            <p><strong>{t.gpa}</strong></p>
          </div>
          <div className="info-item">
            <div className="card-header">
              <span className="card-icon">🛠️</span>
              <h4 className="subtitle">{t.skillsTitle}</h4>
            </div>
            <ul className="list">
              {t.skillsList.map((skill, index) => <li key={index}>{skill}</li>)}
            </ul>
          </div>
          <div className="info-item">
            <div className="card-header">
              <span className="card-icon">🌍</span>
              <h4 className="subtitle">{t.langTitle}</h4>
            </div>
            <ul className="list">
              {t.langList.map((lang, index) => <li key={index}>{lang}</li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* Deneyim Kısmı */}
      <section id="experience" className="section">
        <h3 className="section-title">{t.expTitle}</h3>
        <div className="experience-grid">
          {t.jobs.map((job, index) => (
            <div key={index} className="experience-item">
              <div className="card-header">
                <span className="card-icon">💼</span>
                <h4 className="job-title">{job.title}</h4>
              </div>
              <p className="job-details">{job.details}</p>
              <p className="job-desc" style={{ whiteSpace: 'pre-line' }}>{job.desc}</p>
            </div>
          ))}
        </div>
        {/* Başka deneyimler buraya eklenebilir */}
      </section>

      {/* Gönüllülük Kısmı */}
      <section id="volunteering" className="section">
        <h3 className="section-title">{t.volTitle}</h3>
        <div className="experience-grid">
          {t.volJobs.map((job, index) => (
            <div key={index} className="experience-item">
              <div className="card-header">
                <span className="card-icon">🤝</span>
                <h4 className="job-title">{job.title}</h4>
              </div>
              <p className="job-details">{job.details}</p>
              <p className="job-desc" style={{ whiteSpace: 'pre-line' }}>{job.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Öne Çıkan Projeler */}
      <section id="projects" className="section">
        <h3 className="section-title">{t.projTitle}</h3>
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card" onClick={() => setSelectedProject(project)}>
              <div className="card-header">
                <span className="card-icon">🚀</span>
                <h4>{project.title}</h4>
              </div>
              <p>{project.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* İletişim Kısmı */}
      <footer id="contact" className="footer">
        <h3 style={{ marginBottom: '30px' }}>{t.contactTitle}</h3>
        <div className="social-links">
          <button 
            onClick={() => setShowContactModal(true)}
            className="gmail-icon-btn"
            aria-label="İletişim Formunu Aç"
          >
            <svg viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
          </button>
          <a 
            href="https://github.com/Ahmetoyann" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="github-icon-btn"
          >
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
            </svg>
          </a>
          <a 
            href="https://www.linkedin.com/in/ahmet-oyan-21bb11330/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="linkedin-icon-btn"
          >
            <svg viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zM6.813 20.452H3.861V9h2.952v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.727v20.545C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.273V1.727C24 .774 23.2 0 22.225 0z"/>
            </svg>
          </a>
        </div>
        <p className="copyright">
          &copy; {new Date().getFullYear()} Ahmet Oyan. {t.copyright}
        </p>
      </footer>

      {showScrollTop && (
        <button onClick={scrollToTop} className="scroll-top-btn" aria-label="Yukarı Çık">
          ⬆
        </button>
      )}

      {/* Modal (Açılır Pencere) */}
      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProject(null)}>×</button>
            <h3>{selectedProject.title}</h3>
            <p>{selectedProject.description}</p>
            <a href={selectedProject.githubLink} target="_blank" rel="noopener noreferrer" className="github-btn">
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
              </svg>
              GitHub
            </a>
          </div>
        </div>
      )}

      {/* İletişim Formu Modal */}
      {showContactModal && (
        <div className="modal-overlay" onClick={() => setShowContactModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowContactModal(false)}>×</button>
            <h3>{t.modalTitle}</h3>
            <form className="contact-form" onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const name = formData.get('name');
              const email = formData.get('email');
              const message = formData.get('message');
              window.location.href = `mailto:ahmedoyan101@gmail.com?subject=İletişim Formu: ${name}&body=Gönderen: ${name} (${email})%0D%0A%0D%0A${message}`;
              setShowContactModal(false);
            }}>
              <div className="form-group">
                <label htmlFor="name">{t.formName}</label>
                <input type="text" id="name" name="name" required className="form-input" placeholder={t.phName} />
              </div>
              <div className="form-group">
                <label htmlFor="email">{t.formEmail}</label>
                <input type="email" id="email" name="email" required className="form-input" placeholder={t.phEmail} />
              </div>
              <div className="form-group">
                <label htmlFor="message">{t.formMsg}</label>
                <textarea id="message" name="message" required className="form-textarea" rows="4" placeholder={t.phMsg}></textarea>
              </div>
              <button type="submit" className="form-submit-btn">{t.formBtn}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
