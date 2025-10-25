"use client";
import { useState, useEffect } from "react";
import {
  Scissors,
  Star,
  Calendar,
  Instagram,
  Facebook,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import GalleryLightbox from "@/components/Gallery/GalleryLightbox";

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const heroSlides = [
    {
      image:
        "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=1920&q=80",
      title: "Timeless",
      subtitle: "Beauty",
      description: "สัมผัสประสบการณ์การดูแลผมระดับพรีเมียม",
    },
    {
      image:
        "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920&q=80",
      title: "Expert",
      subtitle: "Care",
      description: "ช่างผู้เชี่ยวชาญพร้อมให้คำปรึกษา",
    },
    {
      image:
        "https://images.unsplash.com/photo-1522337094846-8a818192de1f?w=1920&q=80",
      title: "Premium",
      subtitle: "Quality",
      description: "ผลิตภัณฑ์คุณภาพสูงจากทั่วโลก",
    },
  ];

  const services = [
    {
      title: "Haircut",
      description: "ตัดผมและออกแบบทรงผมที่เข้ากับบุคลิกของคุณ",
      price: "฿450 - ฿1,200",
      image:
        "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",
    },
    {
      title: "Coloring",
      description: "ย้อมสี ไฮไลท์ บาลายาจ ด้วยสีระดับพรีเมียม",
      price: "฿1,800 - ฿4,500",
      image:
        "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&q=80",
    },
    {
      title: "Treatment",
      description: "บำรุงผมเข้มข้น ฟื้นฟูเส้นผมให้แข็งแรง",
      price: "฿800 - ฿2,000",
      image:
        "https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=800&q=80",
    },
    {
      title: "Hair Spa",
      description: "ผ่อนคลายพร้อมบำรุงผมอย่างล้ำลึก",
      price: "฿1,200 - ฿2,800",
      image:
        "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
    },
    {
      title: "Styling",
      description: "จัดแต่งทรงผมสำหรับงานพิเศษและโอกาสสำคัญ",
      price: "฿600 - ฿1,500",
      image:
        "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=800&q=80",
    },
    {
      title: "Perm",
      description: "ดัดผม เพิ่มวอลุ่ม สร้างลูกเวฟสวยธรรมชาติ",
      price: "฿2,200 - ฿5,000",
      image:
        "https://images.unsplash.com/photo-1595475884562-073c30d45670?w=800&q=80",
    },
  ];

  const testimonials = [
    {
      name: "คุณพิมพ์ชนก ส.",
      rating: 5,
      comment:
        "ประทับใจมากค่ะ ช่างใส่ใจทุกรายละเอียด ผมออกมาสวยเป๊ะตรงใจ บรรยากาศในร้านก็ดีมาก จะกลับมาใช้บริการอีกแน่นอน",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    },
    {
      name: "คุณณัฐวุฒิ จ.",
      rating: 5,
      comment:
        "บรรยากาศดี สะอาด เป็นส่วนตัว ช่างให้คำแนะนำดีมาก คุ้มค่ากับราคาที่จ่ายไป ครั้งต่อไปจะมาอีกแน่นอนครับ",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    },
    {
      name: "คุณอารยา ว.",
      rating: 5,
      comment:
        "ย้อมสีออกมาสวยมาก คุณภาพดี ไม่ทำลายเส้นผม พนักงานบริการดีเยี่ยม แนะนำเลยค่ะ ราคาดีด้วย",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    },
  ];

  const stylists = [
    {
      name: "พี่มิ้นท์",
      specialty: "Color Specialist",
      experience: "12 ปี",
      description: "เชี่ยวชาญด้านการย้อมสีและไฮไลท์",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
    },
    {
      name: "พี่เบสท์",
      specialty: "Cut & Style Expert",
      experience: "10 ปี",
      description: "ผู้เชี่ยวชาญด้านการตัดและจัดแต่งทรงผม",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
    },
    {
      name: "พี่ปอนด์",
      specialty: "Treatment Pro",
      experience: "8 ปี",
      description: "ผู้เชี่ยวชาญด้านการบำรุงและฟื้นฟูผม",
      image:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&q=80",
    },
  ];

  const gallery = [
    "https://images.unsplash.com/photo-1522337094846-8a818192de1f?w=600&q=80",
    "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&q=80",
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80",
    "https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=600&q=80",
    "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=600&q=80",
    "https://images.unsplash.com/photo-1595475884562-073c30d45670?w=600&q=80",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.15 },
    );

    // ✅ เพิ่ม id "anim-stylist-0" ถึง "anim-stylist-2" ให้ observer เห็นตั้งแต่แรก
    document.querySelectorAll('[id^="anim-"]').forEach((el) => {
      observer.observe(el);
    });

    // ✅ บังคับเปิด section stylists ทันทีเมื่อโหลด
    setIsVisible((prev) => ({
      ...prev,
      "anim-stylists-header": true,
      "anim-stylist-0": true,
      "anim-stylist-1": true,
      "anim-stylist-2": true,
    }));

    return () => observer.disconnect();
  }, []);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () =>
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length,
    );

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-[2500ms] ease-out ${
              index === currentSlide
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-white/50 to-white z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent z-10"></div>
            <img
              src={slide.image}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
          </div>
        ))}

        <div className="relative z-20 text-center px-8 max-w-6xl">
          <div className="sm:mb-12 mb-6 overflow-hidden">
            <div className="inline-flex items-center gap-3 mb-4 animate-[fadeIn_2s_ease-out]">
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
              <p className="text-gray-400 sm:text-xs text-sm tracking-[0.5em] font-light uppercase">
                Professional Hair Salon
              </p>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
            </div>
          </div>

          <h1 className="mb-6 sm:mb-4 animate-[fadeInUp_1.5s_ease-out_0.3s_both]">
            <span className="block text-5xl sm:text-7xl md:text-9xl text-gray-900 font-extralight tracking-tight leading-none mb-4">
              {heroSlides[currentSlide].title}
            </span>
            <span className="block text-5xl sm:text-6xl md:text-8xl text-gray-700 font-extralight tracking-tight leading-none">
              {heroSlides[currentSlide].subtitle}
            </span>
          </h1>

          <div className="max-w-2xl mx-auto mb-16 animate-[fadeInUp_1.5s_ease-out_0.6s_both]">
            <p className="text-gray-600 text-sm sm:text-xl font-light leading-relaxed tracking-wide mb-3">
              {heroSlides[currentSlide].description}
            </p>
            <p className="text-gray-500 text-base font-light text-sm sm:text-xl">
              ด้วยความใส่ใจในทุกรายละเอียด
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 animate-[fadeInUp_1.5s_ease-out_0.9s_both]">
            <button className="group bg-gray-900 text-white px-10 sm:px-16 py-4 sm:py-6 rounded-full text-sm tracking-[0.25em] hover:bg-gray-800 hover:shadow-2xl hover:shadow-gray-900/30 transition-all duration-700 inline-flex items-center gap-4 font-light">
              <Calendar
                className="w-5 h-5 group-hover:rotate-12 transition-transform duration-700"
                strokeWidth={1.5}
              />
              จองคิวตอนนี้
              <Sparkles
                className="w-4 h-4 group-hover:scale-125 transition-transform duration-700"
                strokeWidth={1.5}
              />
            </button>
            <button className="group bg-white/90 backdrop-blur-sm text-gray-900 px-10 sm:px-16 py-4 sm:py-6 rounded-full text-sm tracking-[0.25em] hover:bg-white hover:shadow-xl transition-all duration-700 inline-flex items-center gap-4 font-light border border-gray-200">
              ดูบริการทั้งหมด
              <svg
                className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-5 sm:left-10 top-1/2 sm:top-1/2 -translate-y-1/2 z-30 bg-white/95 backdrop-blur-md hover:bg-white p-3 sm:p-5 rounded-full transition-all duration-500 hover:scale-110 shadow-xl border border-gray-100/50 group"
        >
          <ChevronLeft
            className="sm:w-6 sm:h-6 w-3 h-3 text-gray-900 group-hover:-translate-x-0.5 transition-transform duration-500"
            strokeWidth={1.5}
          />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-5 top-1/2 -translate-y-1/2 z-30 bg-white/95 backdrop-blur-md hover:bg-white p-3 sm:p-5 rounded-full transition-all duration-500 hover:scale-110 shadow-xl border border-gray-100/50 group"
        >
          <ChevronRight
            className="sm:w-6 sm:h-6 w-3 h-3 text-gray-900 group-hover:translate-x-0.5 transition-transform duration-500"
            strokeWidth={1.5}
          />
        </button>

        {/* Dots */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-30 flex gap-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-700 ${
                index === currentSlide
                  ? "w-12 bg-gray-900"
                  : "w-2 bg-gray-400 hover:bg-gray-600"
              }`}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <div
          className="absolute bottom-16 left-1/2 -translate-x-1/2 z-30 animate-[bounce_3s_infinite] hidden md:block"
          style={{ bottom: "100px" }}
        >
          <div className="flex flex-col items-center gap-3">
            <span className="text-xs text-gray-400 tracking-[0.3em] font-light uppercase">
              Scroll
            </span>
            <div className="w-px h-16 bg-gradient-to-b from-gray-400 via-gray-300 to-transparent"></div>
          </div>
        </div>
      </div>

      {/* Services */}
      <section
        id="services"
        className="sm:py-24 py-12 bg-gradient-to-b from-white via-gray-50/40 to-white relative overflow-hidden"
      >
        <div className="absolute top-32 -left-32 w-[600px] h-[600px] bg-gradient-to-br from-gray-200/40 via-gray-100/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 -right-32 w-[700px] h-[700px] bg-gradient-to-tl from-gray-300/30 via-gray-200/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-radial from-gray-100/15 to-transparent rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto sm:px-8 px-4 relative z-10">
          <div
            id="anim-services"
            className={`text-center sm:mb-28 mb-14 transition-all duration-1200 ${
              isVisible["anim-services"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-16"
            }`}
          >
            <div className="inline-block sm:mb-10 mb-5">
              <Scissors
                className="w-12 h-12 text-gray-300 mx-auto mb-8 animate-[spin_20s_linear_infinite]"
                strokeWidth={0.7}
                style={{ animationDirection: "reverse" }}
              />
            </div>
            <p className="text-gray-400 text-[10px] sm:text-xs tracking-[0.5em] mb-10 font-light uppercase">
              Our Services
            </p>
            <h2 className="text-4xl sm:text-6xl text-gray-900 font-extralight tracking-tight mb-8 leading-none">
              บริการของเรา
            </h2>
            <p className="text-gray-500 text-base sm:text-lg font-light max-w-3xl mx-auto leading-relaxed mb-10">
              บริการครบวงจร ด้วยมาตรฐานระดับสากล และความใส่ใจในทุกขั้นตอน
            </p>
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
            {services.map((service, index) => (
              <div
                key={index}
                id={`anim-service-${index}`}
                className={`group relative bg-white rounded-[1.5rem] md:rounded-[2rem] overflow-hidden hover:shadow-2xl transition-all duration-1000 border border-gray-100/70 hover:border-gray-200 md:hover:-translate-y-4 ${
                  isVisible[`anim-service-${index}`]
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-16"
                }`}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900/0 via-gray-900/0 to-gray-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none z-10"></div>

                {/* ปรับขนาดภาพให้พอดีในมือถือ */}
                <div className="relative h-44 sm:h-56 md:h-96 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-[2000ms] ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-10">
                    <h3 className="text-base sm:text-lg md:text-4xl text-white mb-2 sm:mb-3 font-extralight tracking-wide drop-shadow-2xl leading-tight">
                      {service.title}
                    </h3>
                  </div>
                </div>

                {/* ปรับ padding ภายในเฉพาะมือถือ */}
                <div className="p-5 sm:p-6 md:p-12 relative">
                  <div className="w-10 md:w-16 h-px bg-gradient-to-r from-gray-900 via-gray-600 to-transparent mb-4 sm:mb-6 md:mb-8 group-hover:w-24 transition-all duration-1000"></div>

                  <p className="text-gray-600 text-sm sm:text-base mb-6 sm:mb-8 md:mb-10 font-light leading-relaxed min-h-[3rem] md:min-h-[4rem]">
                    {service.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <p className="text-sm sm:text-xl md:text-2xl text-gray-900 font-light tracking-wide">
                      {service.price}
                    </p>
                    <button className="text-gray-400 group-hover:text-gray-900 group-hover:translate-x-2 md:group-hover:translate-x-3 transition-all duration-700">
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="sm:py-24 py-12 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto sm:px-8 px-4 relative z-10">
          <div
            id="anim-testimonials"
            className={`text-center mb-16 sm:mb-24 transition-all duration-1200 ${
              isVisible["anim-testimonials"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-16"
            }`}
          >
            <p className="text-gray-400 text-[10px] sm:text-xs tracking-[0.4em] sm:tracking-[0.5em] mb-6 sm:mb-10 font-light uppercase">
              Testimonials
            </p>
            <h2 className="text-4xl sm:text-6xl md:text-7xl text-gray-900 font-extralight tracking-tight mb-4 sm:mb-8 leading-none">
              รีวิวจากลูกค้า
            </h2>
            <p className="text-gray-500 text-base sm:text-lg font-light max-w-md sm:max-w-2xl mx-auto leading-relaxed px-2 mb-10">
              ความประทับใจที่ลูกค้าส่งมาให้เรา
            </p>
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto"></div>
          </div>

          {/* มือถือ: flex scroll, เดสก์ท็อป: grid */}
          <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12 overflow-x-auto sm:overflow-visible snap-x snap-mandatory scrollbar-hide">
            {testimonials.map((item, index) => (
              <div
                key={index}
                id={`anim-testimonial-${index}`}
                className={`
            bg-gradient-to-br from-gray-50/80 to-white/80 backdrop-blur-sm
            p-8 sm:p-10 md:p-12 rounded-[1.5rem] md:rounded-[2rem]
            hover:shadow-2xl transition-all duration-1000 border border-gray-100/80
            hover:border-gray-200 md:hover:-translate-y-3 text-center
            shrink-0 w-[85%] sm:w-auto snap-center
            ${
                isVisible["anim-testimonials"]
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95"
              }`}
                style={{ transitionDelay: `${index * 180}ms` }}
              >
                <div className="flex flex-col items-center mb-8">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover ring-2 ring-gray-100 shadow-lg mb-4"
                  />
                  <span className="text-gray-900 font-light tracking-wide text-base sm:text-lg mb-2">
                    {item.name}
                  </span>
                  <div className="flex gap-1 justify-center">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400 fill-amber-400"
                        strokeWidth={0.5}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-gray-600 font-light leading-relaxed sm:leading-[1.9] text-base sm:text-lg">
                  "{item.comment}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stylists */}
      <section
        id="stylists"
        className="sm:py-24 py-12 bg-gradient-to-b from-gray-50/50 via-white to-gray-50/50 relative overflow-hidden"
      >
        {/* background blur */}
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-gradient-to-l from-gray-200/40 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-gradient-to-r from-gray-200/40 to-transparent rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto sm:px-8 px-4 relative z-10">
          {/* Header */}
          <div
            id="anim-stylists-header"
            className={`text-center mb-16 sm:mb-24 transition-all duration-1200 ${
              isVisible["anim-stylists-header"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-16"
            }`}
          >
            <p className="text-gray-400 text-[10px] sm:text-xs tracking-[0.5em] mb-10 font-light uppercase">
              Meet Our Team
            </p>
            <h2 className="text-4xl sm:text-6xl  text-gray-900 font-extralight tracking-tight mb-8 leading-none">
              ช่างผมมืออาชีพ
            </h2>
            <p className="text-gray-500 text-base sm:text-lg font-light max-w-2xl mx-auto leading-relaxed mb-10">
              ทีมผู้เชี่ยวชาญด้านการดูแลเส้นผมที่พร้อมดูแลคุณ
            </p>
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto"></div>
          </div>

          {/* ✅ mobile/tablet: horizontal scroll | desktop: grid 3 */}
          <div className="md:hidden overflow-x-auto scrollbar-hide">
            <div className="flex gap-8 sm:gap-10 snap-x snap-mandatory scroll-smooth px-2 pb-4">
              {stylists.map((stylist: any, index: number) => {
                const isActive = activeIndex === index;

                return (
                  <div
                    key={index}
                    onClick={() => handleToggle(index)}
                    className={`group text-center flex-shrink-0 w-[250px] sm:w-[300px] snap-center transition-all duration-700 ${
                      isVisible[`anim-stylist-${index}`]
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-12"
                    }`}
                  >
                    <div className="relative mb-8 overflow-hidden rounded-[2rem] shadow-lg">
                      <img
                        src={stylist.image}
                        alt={stylist.name}
                        className={`w-full h-[400px] object-cover transition-all duration-[1500ms] ease-out ${
                          isActive
                            ? "scale-105 grayscale-0"
                            : "grayscale group-hover:grayscale-0 group-hover:scale-105"
                        }`}
                      />
                      <div
                        className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-700 ${
                          isActive
                            ? "opacity-100"
                            : "opacity-0 group-hover:opacity-100"
                        }`}
                      ></div>

                      <div
                        className={`absolute bottom-0 left-0 right-0 p-6 transition-transform duration-700 ${
                          isActive
                            ? "translate-y-0"
                            : "translate-y-full group-hover:translate-y-0"
                        }`}
                      >
                        <div className="bg-white/98 backdrop-blur-xl rounded-[1.5rem] p-6 border border-gray-100/80 shadow-2xl">
                          <h3 className="text-2xl text-gray-900 mb-2 font-extralight tracking-wide">
                            {stylist.name}
                          </h3>
                          <p className="text-gray-600 text-sm mb-1 font-light tracking-wider">
                            {stylist.specialty}
                          </p>
                          <p className="text-gray-500 text-xs font-light mb-2">
                            ประสบการณ์ {stylist.experience}
                          </p>
                          <p className="text-gray-500 text-sm font-light leading-relaxed">
                            {stylist.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`transition-opacity duration-700 ${
                        isActive ? "opacity-0" : "group-hover:opacity-0"
                      }`}
                    >
                      <h3 className="text-2xl text-gray-900 mb-2 font-extralight tracking-wide">
                        {stylist.name}
                      </h3>
                      <p className="text-gray-500 text-sm mb-1 font-light tracking-wider">
                        {stylist.specialty}
                      </p>
                      <p className="text-gray-400 text-xs font-light tracking-wide">
                        ประสบการณ์ {stylist.experience}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ✅ Desktop: grid 3 columns */}
          <div className="hidden md:grid md:grid-cols-3 gap-12">
            {stylists.map((stylist: any, index: number) => (
              <div
                key={index}
                className={`group text-center transition-all duration-1000 ${
                  isVisible[`anim-stylist-${index}`]
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-12"
                }`}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <div className="relative mb-10 overflow-hidden rounded-[2rem] shadow-lg">
                  <img
                    src={stylist.image}
                    alt={stylist.name}
                    className="w-full h-[600px] object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1500ms] ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

                  <div className="absolute bottom-0 left-0 right-0 p-10 translate-y-full group-hover:translate-y-0 transition-transform duration-1000">
                    <div className="bg-white/98 backdrop-blur-xl rounded-[1.5rem] p-8 border border-gray-100/80 shadow-2xl">
                      <h3 className="text-3xl text-gray-900 mb-3 font-extralight tracking-wide">
                        {stylist.name}
                      </h3>
                      <p className="text-gray-600 text-base mb-2 font-light tracking-wider">
                        {stylist.specialty}
                      </p>
                      <p className="text-gray-500 text-sm font-light mb-4">
                        ประสบการณ์ {stylist.experience}
                      </p>
                      <p className="text-gray-500 text-sm font-light leading-relaxed">
                        {stylist.description}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group-hover:opacity-0 transition-opacity duration-700">
                  <h3 className="text-3xl text-gray-900 mb-4 font-extralight tracking-wide">
                    {stylist.name}
                  </h3>
                  <p className="text-gray-500 text-base mb-2 font-light tracking-wider">
                    {stylist.specialty}
                  </p>
                  <p className="text-gray-400 text-sm font-light tracking-wide">
                    ประสบการณ์ {stylist.experience}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="sm:py-24 py-12 bg-white">
        <div className="max-w-7xl mx-auto sm:px-8 px-4">
          {/* Header */}
          <div
            id="anim-gallery-header"
            className={`text-center mb-24 transition-all duration-1200 ${
              isVisible["anim-gallery-header"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-16"
            }`}
          >
            <p className="text-gray-400 text-[10px] sm:text-xs tracking-[0.5em] mb-10 font-light uppercase">
              Portfolio
            </p>
            <h2 className="text-4xl sm:text-6xl  text-gray-900 font-extralight tracking-tight mb-8 leading-none">
              ผลงานของเรา
            </h2>
            <p className="text-gray-500 text-base sm:text-lg font-light max-w-2xl mx-auto leading-relaxed mb-10">
              ความงามที่เราสร้างสรรค์ร่วมกับลูกค้าของเรา
            </p>
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto"></div>
          </div>

          {/* Gallery grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {gallery.map((image: string, index: number) => (
              <div
                key={index}
                onClick={() => setSelectedImage(image)} // ✅ เปิด popup
                id={`anim-gallery-${index}`}
                className={`relative aspect-square overflow-hidden group transition-all duration-1000 rounded-[1.5rem] shadow-lg cursor-pointer ${
                  isVisible[`anim-gallery-${index}`]
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-90"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <img
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms] ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-1000"></div>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700">
                  <div className="bg-white/95 backdrop-blur-md w-20 h-20 rounded-full flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-all duration-700 border border-gray-100">
                    <svg
                      className="w-8 h-8 text-gray-900"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <GalleryLightbox
          selectedImage={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      </section>
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }
      `}</style>
    </div>
  );
}
