'use client';

import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [count, setCount] = useState({ pages: 0, chapters: 0, sections: 0, demands: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);

    // Animated counters
    const targets = { pages: 55, chapters: 2, sections: 4, demands: 12 };
    const duration = 2000;
    const steps = 60;
    let current = 0;
    const interval = setInterval(() => {
      current++;
      if (current >= steps) {
        setCount(targets);
        clearInterval(interval);
      } else {
        setCount({
          pages: Math.floor((targets.pages * current) / steps),
          chapters: Math.floor((targets.chapters * current) / steps),
          sections: Math.floor((targets.sections * current) / steps),
          demands: Math.floor((targets.demands * current) / steps),
        });
      }
    }, duration / steps);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  const navLinks = [
    { href: '#home', label: 'الرئيسية' },
    { href: '#about', label: 'عن المذكرة' },
    { href: '#chapters', label: 'الفصول' },
    { href: '#institute', label: 'المعهد' },
    { href: '#author', label: 'الباحثة' },
    { href: '#contact', label: 'تواصل' },
  ];

  const chapters = [
    {
      number: 'الفصل الأول',
      title: 'الإطار المفاهيمي للقيادة الإدارية',
      sections: [
        {
          name: 'المبحث الأول: ماهية القيادة الإدارية',
          items: [
            'المطلب الأول: مفهوم القيادة الإدارية',
            'المطلب الثاني: أهمية القيادة الإدارية',
            'المطلب الثالث: خصائص القيادة الإدارية',
          ],
        },
        {
          name: 'المبحث الثاني: أنماط وصفات القيادة الإدارية',
          items: [
            'المطلب الأول: أنماط القيادة',
            'المطلب الثاني: مهارات القيادة الإدارية ووظائفها',
            'المطلب الثالث: صفات القائد الإداري',
          ],
        },
      ],
    },
    {
      number: 'الفصل الثاني',
      title: 'الإطار المفاهيمي لأداء الموظفين',
      sections: [
        {
          name: 'المبحث الأول: الأداء وتقييمه',
          items: [
            'المطلب الأول: مفهوم الأداء والعوامل المؤثرة عليه',
            'المطلب الثاني: مفهوم تقييم الأداء وأهميته',
            'المطلب الثالث: طرق وأساليب تقييم الأداء',
          ],
        },
        {
          name: 'المبحث الثاني: آليات تأثير القيادة الإدارية في تحسين أداء الموظفين',
          items: [
            'المطلب الأول: دور القيادة الإدارية في تحفيز الموظفين',
            'المطلب الثاني: أثر القيادة الإدارية في تنمية مهارات وكفاءات الموظفين',
            'المطلب الثالث: دور القيادة الإدارية في تعزيز الرضا الوظيفي وتحقيق الأهداف التنظيمية',
          ],
        },
      ],
    },
  ];

  // Generate stars deterministically (no Math.random in render)
  const stars = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    top: (i * 37) % 100,
    left: (i * 53) % 100,
    size: 2 + (i % 3),
    duration: 15 + (i % 10),
    delay: (i % 5) * 2,
  }));

  const scrollToSection = (href: string) => {
    setMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ minHeight: '100vh', background: '#faf7f0' }}>
      {/* شريط التقدم */}
      <ProgressBar />

      {/* شريط التنقل */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          left: 0,
          zIndex: 50,
          transition: 'all 0.3s',
          padding: scrolled ? '12px 0' : '20px 0',
          background: scrolled ? 'rgba(13, 27, 42, 0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(15px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(201, 169, 97, 0.3)' : 'none',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #c9a961, #f0d589)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
            }}>
              ✦
            </div>
            <span style={{ fontFamily: 'var(--font-amiri), serif', fontSize: '20px', fontWeight: 700, color: '#c9a961' }}>
              القيادة الإدارية
            </span>
          </div>

          {/* روابط سطح المكتب */}
          <ul style={{ display: 'flex', gap: '8px', listStyle: 'none' }} className="hidden md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => scrollToSection(link.href)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: 'none',
                    background: 'transparent',
                    color: '#faf7f0',
                    fontFamily: 'var(--font-cairo), sans-serif',
                    fontSize: '14px',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(201, 169, 97, 0.2)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* زر القائمة للجوال */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#faf7f0',
              fontSize: '24px',
              cursor: 'pointer',
            }}
            className="md:hidden"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* قائمة الجوال */}
        {menuOpen && (
          <div style={{ background: 'rgba(13, 27, 42, 0.95)', padding: '16px 24px', borderTop: '1px solid rgba(201, 169, 97, 0.2)' }} className="md:hidden">
            <ul style={{ listStyle: 'none' }}>
              {navLinks.map((link) => (
                <li key={link.href} style={{ marginBottom: '8px' }}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    style={{
                      width: '100%',
                      textAlign: 'right',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      border: 'none',
                      background: 'transparent',
                      color: '#faf7f0',
                      fontFamily: 'var(--font-cairo), sans-serif',
                      cursor: 'pointer',
                    }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      {/* القسم الرئيسي - Hero */}
      <section
        id="home"
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #0a0f1c 0%, #0d1b2a 30%, #1b2d4a 70%, #0a0f1c 100%)',
          padding: '100px 24px 60px',
        }}
      >
        {/* النجوم */}
        {stars.map((star) => (
          <div
            key={star.id}
            style={{
              position: 'absolute',
              top: `${star.top}%`,
              left: `${star.left}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              borderRadius: '50%',
              background: '#c9a961',
              opacity: 0.6,
              animation: `particle-float ${star.duration}s linear infinite`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}

        {/* دوائر متوهجة */}
        <div style={{
          position: 'absolute',
          top: '20%',
          right: '15%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201, 169, 97, 0.3) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'glow-pulse 8s ease-in-out infinite',
        }} />

        {/* الإطار الذهبي */}
        <div style={{
          position: 'absolute',
          top: '32px',
          right: '32px',
          bottom: '32px',
          left: '32px',
          border: '2px solid rgba(201, 169, 97, 0.3)',
          borderRadius: '8px',
          pointerEvents: 'none',
        }} />

        {/* المحتوى */}
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '900px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 20px',
            borderRadius: '999px',
            background: 'rgba(201, 169, 97, 0.1)',
            border: '1px solid rgba(201, 169, 97, 0.3)',
            marginBottom: '32px',
          }}>
            <span style={{ color: '#f0d589', fontFamily: 'var(--font-cairo), sans-serif', fontSize: '14px' }}>
              ✦ الجمهورية الجزائرية الديمقراطية الشعبية
            </span>
          </div>

          <p style={{ color: '#f0d589', fontFamily: 'var(--font-cairo), sans-serif', fontSize: '18px', marginBottom: '8px' }}>
            وزارة التكوين والتعليم المهنيين
          </p>
          <p style={{ color: 'rgba(250, 247, 240, 0.8)', fontFamily: 'var(--font-cairo), sans-serif', fontSize: '15px', marginBottom: '40px' }}>
            المعهد الوطني المتخصص في التكوين المهني – الشهيد كرار مولود بئر خادم
          </p>

          <div style={{ marginBottom: '24px' }}>
            <span style={{ color: '#c9a961', fontSize: '24px' }}>✦</span>
            <span style={{ color: '#c9a961', fontSize: '32px', margin: '0 12px' }}>❖</span>
            <span style={{ color: '#c9a961', fontSize: '24px' }}>✦</span>
          </div>

          <h1 className="shimmer-text" style={{
            fontFamily: 'var(--font-amiri), serif',
            fontSize: 'clamp(48px, 8vw, 96px)',
            fontWeight: 700,
            marginBottom: '24px',
            lineHeight: 1.2,
          }}>
            القيادة الإدارية
          </h1>

          <p style={{
            fontFamily: 'var(--font-amiri), serif',
            fontSize: 'clamp(24px, 4vw, 48px)',
            color: '#faf7f0',
            marginBottom: '48px',
          }}>
            ودورها في تحسين أداء الموظفين
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '48px', marginBottom: '48px' }}>
            <div>
              <p style={{ color: '#c9a961', fontSize: '14px', marginBottom: '4px' }}>من إعداد</p>
              <p style={{ color: '#faf7f0', fontFamily: 'var(--font-amiri), serif', fontSize: '24px', fontWeight: 700 }}>مزوار وفاء</p>
            </div>
            <div style={{ width: '1px', background: 'rgba(201, 169, 97, 0.3)' }} />
            <div>
              <p style={{ color: '#c9a961', fontSize: '14px', marginBottom: '4px' }}>التخصص</p>
              <p style={{ color: '#faf7f0', fontFamily: 'var(--font-cairo), sans-serif', fontSize: '20px' }}>تسيير الموارد البشرية</p>
            </div>
            <div style={{ width: '1px', background: 'rgba(201, 169, 97, 0.3)' }} />
            <div>
              <p style={{ color: '#c9a961', fontSize: '14px', marginBottom: '4px' }}>دفعة</p>
              <p style={{ color: '#faf7f0', fontFamily: 'var(--font-cairo), sans-serif', fontSize: '20px' }}>فيفري ٢٠٢٧</p>
            </div>
          </div>

          <button
            onClick={() => scrollToSection('#about')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '16px 32px',
              borderRadius: '999px',
              border: 'none',
              background: 'linear-gradient(135deg, #c9a961, #f0d589)',
              color: '#0d1b2a',
              fontFamily: 'var(--font-cairo), sans-serif',
              fontSize: '16px',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 10px 30px rgba(201, 169, 97, 0.4)',
            }}
          >
            اكتشف المذكرة ↓
          </button>
        </div>
      </section>

      {/* قسم عن المذكرة */}
      <section id="about" style={{ padding: '96px 24px', background: 'linear-gradient(180deg, #faf7f0 0%, #f5ecd9 100%)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div style={{ color: '#c9a961', fontSize: '24px', marginBottom: '16px' }}>✦</div>
            <h2 style={{ fontFamily: 'var(--font-amiri), serif', fontSize: '48px', fontWeight: 700, color: '#0d1b2a', marginBottom: '16px' }}>
              عن المذكرة
            </h2>
            <p style={{ color: '#5a4a35', fontSize: '18px' }}>
              مذكرة نهاية التكوين لنيل شهادة تقني سامٍ في تسيير الموارد البشرية
            </p>
          </div>

          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '48px',
            marginBottom: '48px',
            border: '1px solid #e6d9b8',
            boxShadow: '0 20px 60px -15px rgba(13, 27, 42, 0.1)',
          }}>
            <p style={{ color: '#1a0f08', fontSize: '18px', lineHeight: 1.8, marginBottom: '16px', textAlign: 'justify' }}>
              تشكّل القيادة الإدارية الركيزة الأساسية لنجاح أي منظمة في عصرنا الحديث، إذ لم يعد يُنظر إلى القائد باعتباره مجرد مسؤول عن إصدار الأوامر ومراقبة التنفيذ، بل أصبح يُعتبر المحرّك الرئيسي للطاقات والإمكانات داخل المنظمة.
            </p>
            <p style={{ color: '#5a4a35', fontSize: '16px', lineHeight: 1.8, textAlign: 'justify' }}>
              تتناول هذه المذكرة العلاقة الجوهرية بين القيادة الإدارية وأداء الموظفين، من خلال إطار نظري شامل يربط بين المفاهيم والنظريات والممارسات الحديثة في هذا المجال الحيوي.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
            {[
              { icon: '📚', title: 'دراسة شاملة', desc: 'تتناول القيادة الإدارية من منظور أكاديمي شامل.' },
              { icon: '🎯', title: 'ربط بالواقع', desc: 'تركز على العلاقة بين القيادة وأداء الموظفين.' },
              { icon: '💡', title: 'نظريات حديثة', desc: 'تستعرض أحدث النظريات القيادية المعاصرة.' },
              { icon: '👥', title: 'تركيز على الإنسان', desc: 'تؤمن بأن القيادة رسالة قبل أن تكون منصباً.' },
            ].map((feature, i) => (
              <div key={i} style={{
                background: 'white',
                borderRadius: '16px',
                padding: '24px',
                textAlign: 'center',
                border: '1px solid #e6d9b8',
                transition: 'transform 0.3s',
              }}>
                <div style={{ fontSize: '40px', marginBottom: '12px' }}>{feature.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-amiri), serif', fontSize: '20px', fontWeight: 700, color: '#0d1b2a', marginBottom: '12px' }}>
                  {feature.title}
                </h3>
                <p style={{ color: '#5a4a35', fontSize: '14px', lineHeight: 1.6 }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* قسم الإحصائيات */}
      <section style={{
        padding: '80px 24px',
        background: 'linear-gradient(135deg, #c9a961 0%, #f0d589 50%, #c9a961 100%)',
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '32px', textAlign: 'center' }}>
          {[
            { value: count.pages, label: 'صفحة' },
            { value: count.chapters, label: 'فصل' },
            { value: count.sections, label: 'مبحث' },
            { value: count.demands, label: 'مطلب' },
          ].map((stat, i) => (
            <div key={i}>
              <div style={{
                width: '56px',
                height: '56px',
                margin: '0 auto 12px',
                borderRadius: '16px',
                background: 'rgba(13, 27, 42, 0.9)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                color: '#f0d589',
              }}>
                {['📄', '📖', '📑', '✦'][i]}
              </div>
              <div style={{ fontFamily: 'var(--font-amiri), serif', fontSize: '48px', fontWeight: 700, color: '#0d1b2a' }}>
                {stat.value}
              </div>
              <p style={{ color: 'rgba(13, 27, 42, 0.8)', fontFamily: 'var(--font-cairo), sans-serif', fontWeight: 600 }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* قسم الفصول */}
      <section id="chapters" style={{
        padding: '96px 24px',
        background: 'linear-gradient(180deg, #0d1b2a 0%, #0a0f1c 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '20%', right: 0, width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, #c9a961 0%, transparent 70%)', filter: 'blur(80px)', opacity: 0.2 }} />
        <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div style={{ color: '#c9a961', fontSize: '24px', marginBottom: '16px' }}>✦</div>
            <h2 className="shimmer-text" style={{ fontFamily: 'var(--font-amiri), serif', fontSize: '48px', fontWeight: 700, marginBottom: '16px' }}>
              فصول المذكرة
            </h2>
            <p style={{ color: 'rgba(250, 247, 240, 0.8)', fontSize: '18px' }}>هيكل البحث الأكاديمي للمذكرة</p>
          </div>

          {/* تبويبات الفصول */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px', marginBottom: '48px' }}>
            {chapters.map((chapter, index) => (
              <button
                key={index}
                onClick={() => setActiveChapter(index)}
                style={{
                  padding: '12px 24px',
                  borderRadius: '12px',
                  fontFamily: 'var(--font-cairo), sans-serif',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  background: activeChapter === index ? 'linear-gradient(135deg, #c9a961, #f0d589)' : 'rgba(201, 169, 97, 0.1)',
                  color: activeChapter === index ? '#0d1b2a' : '#faf7f0',
                  border: activeChapter === index ? 'none' : '1px solid rgba(201, 169, 97, 0.3)',
                }}
              >
                {chapter.number}
              </button>
            ))}
          </div>

          {/* محتوى الفصل */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '32px' }}>
            {chapters[activeChapter].sections.map((section, sIndex) => (
              <div key={sIndex} style={{
                background: 'rgba(13, 27, 42, 0.6)',
                borderRadius: '16px',
                padding: '32px',
                border: '1px solid rgba(201, 169, 97, 0.3)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #c9a961, #f0d589)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#0d1b2a',
                    fontWeight: 700,
                    fontSize: '20px',
                  }}>
                    {sIndex + 1}
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-amiri), serif', fontSize: '20px', fontWeight: 700, color: '#c9a961' }}>
                    {section.name}
                  </h3>
                </div>
                <ul style={{ listStyle: 'none' }}>
                  {section.items.map((item, iIndex) => (
                    <li key={iIndex} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      padding: '12px',
                      borderRadius: '8px',
                      marginBottom: '8px',
                      color: '#faf7f0',
                      fontSize: '14px',
                      transition: 'background 0.3s',
                    }}>
                      <span style={{ color: '#c9a961', marginTop: '4px' }}>▼</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <div style={{
              display: 'inline-block',
              padding: '16px 32px',
              borderRadius: '16px',
              background: 'rgba(201, 169, 97, 0.1)',
              border: '1px solid rgba(201, 169, 97, 0.3)',
            }}>
              <p style={{ color: '#f0d589', fontFamily: 'var(--font-amiri), serif', fontSize: '20px' }}>
                ✦ خاتمة عامة: النتائج والتوصيات والملاحق ✦
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* قسم المعهد */}
      <section id="institute" style={{ padding: '96px 24px', background: 'linear-gradient(180deg, #f5ecd9 0%, #faf7f0 100%)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div style={{ color: '#c9a961', fontSize: '24px', marginBottom: '16px' }}>✦</div>
            <h2 style={{ fontFamily: 'var(--font-amiri), serif', fontSize: '48px', fontWeight: 700, color: '#0d1b2a', marginBottom: '16px' }}>
              المؤسسة التعليمية
            </h2>
            <p style={{ color: '#5a4a35', fontSize: '18px' }}>المعهد الوطني المتخصص في التكوين المهني</p>
          </div>

          {/* الصور */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', marginBottom: '48px' }}>
            <div style={{
              borderRadius: '16px',
              overflow: 'hidden',
              border: '2px solid #c9a961',
              boxShadow: '0 10px 40px -10px rgba(201, 169, 97, 0.5)',
            }}>
              <img
                src="/images/institute-1.jpg"
                alt="المعهد الوطني المتخصص في التكوين المهني"
                style={{ width: '100%', height: '320px', objectFit: 'cover', display: 'block' }}
              />
            </div>
            <div style={{
              borderRadius: '16px',
              overflow: 'hidden',
              border: '2px solid #c9a961',
              boxShadow: '0 10px 40px -10px rgba(201, 169, 97, 0.5)',
            }}>
              <img
                src="/images/institute-2.jpg"
                alt="بوابة المعهد"
                style={{ width: '100%', height: '320px', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </div>

          {/* معلومات */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
            {[
              { icon: '🏛️', title: 'المؤسسة', desc: 'المعهد الوطني المتخصص في التكوين المهني' },
              { icon: '🎓', title: 'التخصص', desc: 'تسيير الموارد البشرية' },
              { icon: '📍', title: 'الموقع', desc: 'الشهيد كرار مولود – بئر خادم' },
            ].map((info, i) => (
              <div key={i} style={{
                background: 'white',
                borderRadius: '16px',
                padding: '24px',
                textAlign: 'center',
                border: '1px solid #e6d9b8',
              }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>{info.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-amiri), serif', fontSize: '18px', fontWeight: 700, color: '#0d1b2a', marginBottom: '8px' }}>{info.title}</h3>
                <p style={{ color: '#5a4a35', fontSize: '14px' }}>{info.desc}</p>
              </div>
            ))}
          </div>

          {/* الهيئة المستقبلة */}
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <div style={{
              display: 'inline-block',
              padding: '24px 32px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #0d1b2a, #1b2d4a)',
              border: '1px solid #c9a961',
            }}>
              <p style={{ color: '#c9a961', fontSize: '14px', marginBottom: '8px' }}>الهيئة المستقبلة</p>
              <h3 style={{ fontFamily: 'var(--font-amiri), serif', fontSize: '28px', fontWeight: 700, color: '#f0d589' }}>
                شركة Work Tel
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* قسم الباحثة */}
      <section id="author" style={{ padding: '96px 24px', background: 'linear-gradient(180deg, #0a0f1c 0%, #0d1b2a 100%)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(201, 169, 97, 0.3) 0%, transparent 70%)', filter: 'blur(80px)' }} />
        <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div style={{ color: '#c9a961', fontSize: '24px', marginBottom: '16px' }}>✦</div>
            <h2 className="shimmer-text" style={{ fontFamily: 'var(--font-amiri), serif', fontSize: '48px', fontWeight: 700 }}>
              الباحثة والمشرفون
            </h2>
          </div>

          {/* البطاقة الرئيسية */}
          <div style={{
            background: 'rgba(13, 27, 42, 0.6)',
            borderRadius: '24px',
            padding: '48px',
            textAlign: 'center',
            border: '2px solid rgba(201, 169, 97, 0.3)',
            marginBottom: '32px',
          }}>
            <div style={{
              width: '120px',
              height: '120px',
              margin: '0 auto 24px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #c9a961, #f0d589)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '60px',
              animation: 'float 4s ease-in-out infinite',
            }}>
              👤
            </div>
            <p style={{ color: '#c9a961', fontSize: '14px', marginBottom: '8px' }}>من إعداد</p>
            <h3 className="shimmer-text" style={{ fontFamily: 'var(--font-amiri), serif', fontSize: '40px', fontWeight: 700, marginBottom: '16px' }}>
              مزوار وفاء
            </h3>
            <p style={{ color: 'rgba(250, 247, 240, 0.8)', fontSize: '16px', maxWidth: '600px', margin: '0 auto 24px', lineHeight: 1.8 }}>
              متربّصة بمعهد الشهيد كرار مولود – بئر خادم، تخصص تسيير الموارد البشرية، أنهت تدريبها بمؤسسة Work Tel.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px' }}>
              <span style={{ padding: '8px 20px', borderRadius: '999px', background: 'rgba(201, 169, 97, 0.1)', border: '1px solid rgba(201, 169, 97, 0.3)', color: '#f0d589', fontSize: '14px' }}>
                تسيير الموارد البشرية
              </span>
              <span style={{ padding: '8px 20px', borderRadius: '999px', background: 'rgba(201, 169, 97, 0.1)', border: '1px solid rgba(201, 169, 97, 0.3)', color: '#f0d589', fontSize: '14px' }}>
                دفعة فيفري ٢٠٢٧
              </span>
            </div>
          </div>

          {/* المشرفون */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
            <div style={{
              background: 'rgba(13, 27, 42, 0.6)',
              borderRadius: '16px',
              padding: '32px',
              textAlign: 'center',
              border: '1px solid rgba(201, 169, 97, 0.3)',
            }}>
              <div style={{ fontSize: '40px', marginBottom: '12px' }}>👩‍🏫</div>
              <p style={{ color: '#c9a961', fontSize: '14px', marginBottom: '8px' }}>المؤطرة</p>
              <h4 style={{ fontFamily: 'var(--font-amiri), serif', fontSize: '24px', fontWeight: 700, color: '#faf7f0', marginBottom: '8px' }}>
                قوقام فريال
              </h4>
            </div>
            <div style={{
              background: 'rgba(13, 27, 42, 0.6)',
              borderRadius: '16px',
              padding: '32px',
              textAlign: 'center',
              border: '1px solid rgba(201, 169, 97, 0.3)',
            }}>
              <div style={{ fontSize: '40px', marginBottom: '12px' }}>👨‍🏫</div>
              <p style={{ color: '#c9a961', fontSize: '14px', marginBottom: '8px' }}>المشرف</p>
              <h4 style={{ fontFamily: 'var(--font-amiri), serif', fontSize: '24px', fontWeight: 700, color: '#faf7f0', marginBottom: '8px' }}>
                صديقي عبد الفاتح
              </h4>
            </div>
          </div>

          {/* اقتباس */}
          <div style={{ textAlign: 'center', marginTop: '64px' }}>
            <div style={{ color: '#c9a961', fontSize: '24px', marginBottom: '24px' }}>❖</div>
            <p style={{ fontFamily: 'var(--font-amiri), serif', fontSize: '20px', color: '#f0d589', fontStyle: 'italic', maxWidth: '700px', margin: '0 auto', lineHeight: 1.8 }}>
              "القائد الحقيقي لا يُقاس بما يحققه في حياته فحسب، بل بما يتركه بعده. الإرث الحقيقي للقائد ليس في المباني التي بناها، ولا في الأرباح التي حققها، بل في الناس الذين طورهم، والقيم التي غرسها."
            </p>
          </div>
        </div>
      </section>

      {/* قسم التواصل */}
      <section id="contact" style={{ padding: '96px 24px', background: 'linear-gradient(180deg, #faf7f0 0%, #f5ecd9 100%)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ color: '#c9a961', fontSize: '24px', marginBottom: '16px' }}>✦</div>
          <h2 style={{ fontFamily: 'var(--font-amiri), serif', fontSize: '48px', fontWeight: 700, color: '#0d1b2a', marginBottom: '16px' }}>
            الحصول على المذكرة
          </h2>
          <p style={{ color: '#5a4a35', fontSize: '18px', marginBottom: '48px' }}>
            يمكنكم الاطلاع على المذكرة الكاملة أو التواصل مع الباحثة
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '24px', marginBottom: '48px' }}>
            <a
              href="/memoire_leadership_final_Wafa_Mezouar.pdf"
              download
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px 32px',
                borderRadius: '999px',
                textDecoration: 'none',
                background: 'linear-gradient(135deg, #0d1b2a, #1b2d4a)',
                color: '#f0d589',
                fontFamily: 'var(--font-cairo), sans-serif',
                fontWeight: 600,
                border: '1px solid #c9a961',
              }}
            >
              ⬇ تحميل المذكرة PDF
            </a>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
            {[
              { icon: '📧', title: 'التواصل', desc: 'للتواصل المباشر مع الباحثة' },
              { icon: '📖', title: 'المذكرة', desc: '٥٥ صفحة من المحتوى الأكاديمي' },
              { icon: '⬇', title: 'التحميل', desc: 'تنزيل نسخة PDF كاملة' },
            ].map((info, i) => (
              <div key={i} style={{ background: 'white', borderRadius: '16px', padding: '24px', border: '1px solid #e6d9b8' }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>{info.icon}</div>
                <h4 style={{ fontFamily: 'var(--font-amiri), serif', fontWeight: 700, color: '#0d1b2a', marginBottom: '8px' }}>{info.title}</h4>
                <p style={{ color: '#5a4a35', fontSize: '14px' }}>{info.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* الفوتر */}
      <footer style={{
        padding: '48px 24px',
        background: 'linear-gradient(180deg, #0a0f1c 0%, #0d1b2a 100%)',
        borderTop: '1px solid rgba(201, 169, 97, 0.3)',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ marginBottom: '24px' }}>
            <span style={{ fontFamily: 'var(--font-amiri), serif', fontSize: '20px', fontWeight: 700, color: '#c9a961' }}>
              ✦ القيادة الإدارية ✦
            </span>
          </div>
          <p style={{ color: 'rgba(250, 247, 240, 0.6)', fontSize: '14px', marginBottom: '8px' }}>
            © ٢٠٢٧ - جميع الحقوق محفوظة لـ مزوار وفاء
          </p>
          <p style={{ color: '#c9a961', fontFamily: 'var(--font-amiri), serif' }}>✦ ❖ ✦</p>
        </div>
      </footer>

      {/* زر العودة للأعلى */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          style={{
            position: 'fixed',
            bottom: '32px',
            left: '32px',
            zIndex: 50,
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            background: 'linear-gradient(135deg, #c9a961, #f0d589)',
            color: '#0d1b2a',
            fontSize: '24px',
            cursor: 'pointer',
            boxShadow: '0 10px 30px rgba(201, 169, 97, 0.4)',
          }}
        >
          ↑
        </button>
      )}
    </div>
  );
}

function ProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (scrollTop / docHeight) * 100;
      setProgress(scrolled);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      left: 0,
      height: '4px',
      zIndex: 100,
      background: 'linear-gradient(to left, #c9a961, #f0d589, #c9a961)',
      width: `${progress}%`,
      transition: 'width 0.1s',
    }} />
  );
}
