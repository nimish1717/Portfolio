import FadeIn from './ui/FadeIn';

const services = [
  {
    num: "01",
    title: "3D Modeling",
    desc: "Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations."
  },
  {
    num: "02",
    title: "Rendering",
    desc: "High-quality, photorealistic renders that showcase designs with custom lighting, textures, and materials to bring concepts to life."
  },
  {
    num: "03",
    title: "Motion Design",
    desc: "Dynamic animations and motion graphics that add energy and storytelling to brands, products, and digital experiences."
  },
  {
    num: "04",
    title: "Branding",
    desc: "Crafting cohesive visual identities — from logos to full brand systems — that communicate a clear and memorable presence."
  },
  {
    num: "05",
    title: "Web Design",
    desc: "Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience."
  }
];

export default function ServicesSection() {
  return (
    <section 
      id="services" 
      className="bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative z-10"
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        
        {/* Heading */}
        <FadeIn y={40} className="w-full mb-16 sm:mb-20 md:mb-28">
          <h2 className="text-[#0C0C0C] font-black uppercase text-center text-[clamp(3rem,12vw,160px)] leading-none tracking-tight">
            Services
          </h2>
        </FadeIn>

        {/* Services List */}
        <div className="w-full flex flex-col">
          {services.map((item, i) => (
            <FadeIn 
              key={item.num} 
              delay={i * 0.1} 
              y={30}
              className="w-full flex flex-row items-center border-b border-[rgba(12,12,12,0.15)] py-8 sm:py-10 md:py-12 last:border-0"
            >
              {/* Number */}
              <div className="w-1/3 sm:w-1/4 shrink-0">
                <span className="text-[#0C0C0C] font-black text-[clamp(3rem,10vw,140px)] leading-none">
                  {item.num}
                </span>
              </div>
              
              {/* Content */}
              <div className="w-2/3 sm:w-3/4 flex flex-col gap-2 sm:gap-4 pl-4 sm:pl-8">
                <h3 className="text-[#0C0C0C] font-medium uppercase text-[clamp(1rem,2.2vw,2.1rem)] leading-tight">
                  {item.title}
                </h3>
                <p className="text-[#0C0C0C] font-light opacity-60 leading-relaxed max-w-2xl text-[clamp(0.85rem,1.6vw,1.25rem)]">
                  {item.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
}
