import React from 'react'
import DnaHeader from './DnaHeader'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
const DnaDes = () => {
  const t = useTranslations('About')
  const data = [
    {
      title: 'DATA & INSIGHTS DRIVEN',
      titleAr: 'مدفوعة بالبيانات والرؤى',
      des: 'At Rehla, data is the backbone of everything we do. We dig into the details, extract insights, and use them to guide strategic decisions that lead to growth. Our approach is data-first, ensuring every move is grounded in insights that allow us to understand audiences on a deeper level and deliver relevance with impact.',
      desAr:
        'في رحلة، تشكّل البيانات العمود الفقري لكل ما نقوم به. نحن نغوص في التفاصيل، ونستخلص الرؤى، ونستخدمها لتوجيه القرارات الاستراتيجية التي تقود إلى النمو. نهجنا قائم على البيانات أولاً، مما يضمن أن كل خطوة نقوم بها تستند إلى رؤى عميقة تُمكّننا من فهم الجمهور بشكل أعمق وتقديم محتوى أكثر تأثيراً وملاءمة.',
    },
    {
      title: 'STRATEGIC AGILITY',
      titleAr: 'المرونة الاستراتيجية',
      des: "In a fast-paced, ever-evolving digital landscape, agility has been in our DNA since day one, driving our agency's growth year over year. At Rehla Marketing, we lead with strategic agility, moving swiftly and smartly to adjust to new trends, platforms, and audience behaviors, both online and offline. This agility allows us to craft campaigns that are not only timely but also enduring, keeping our brands freshly relevant while consistently delivering impactful results.",
      desAr:
        'في عالم رقمي سريع التغيّر والتطور، كانت المرونة جزءاً من حمضنا النووي منذ اليوم الأول، وهي ما يقود نمو وكالتنا عاماً بعد عام. في رحلة، نقود بالمرونة الاستراتيجية، فنواكب الاتجاهات الجديدة والمنصات وسلوكيات الجمهور بسرعة وذكاء، سواء على الإنترنت أو خارجه. هذه المرونة تتيح لنا تصميم حملات لا تواكب اللحظة فحسب، بل تظل مؤثرة ودائمة الصدى، مما يحافظ على حيوية العلامات التجارية ويضمن نتائج ملموسة ومستمرة.',
    },
    {
      title: 'CREATIVE ADAPTABILITY',
      titleAr: 'المرونة الإبداعية',
      des: "Creativity is never static, and neither are we. At Rehla Marketing, our creative mindset thrives on adaptability, evolving continuously to meet the demands of the market. We blend inventive thinking with strategic insight, ensuring every creative solution is fresh, flexible, and perfectly aligned with our clients' goals.",
      desAr:
        'الإبداع ليس ثابتاً أبداً، ونحن كذلك. في رحلة، يقوم تفكيرنا الإبداعي على التكيّف المستمر لتلبية متطلبات السوق المتغيرة. نمزج بين الفكر الابتكاري والرؤية الاستراتيجية، لنضمن أن تكون كل فكرة إبداعية جديدة، مرنة، ومتوافقة تماماً مع أهداف عملائنا.',
    },
    {
      title: 'CULTURAL RESONANCE',
      titleAr: 'الانسجام الثقافي',
      des: "Cultural resonance is at the heart of everything we do. We don't just understand the culture we are the culture, we live and breathe it. Our team is part of the region's pulse, and we bring this intimate knowledge into every piece of work, ensuring that our clients' brands connect deeply and authentically with local audiences.",
      desAr:
        'الانسجام الثقافي هو جوهر كل ما نقوم به. نحن لا نفهم الثقافة فقط بل نعيشها ونتنفسها. فريقنا جزء من نبض المنطقة، وننقل هذا الفهم العميق إلى كل عمل نقدمه، مما يضمن أن تتواصل العلامات التجارية لعملائنا مع الجماهير المحلية بشكل عميق وأصيل.',
    },
    {
      title: 'DIGITAL NATIVITY',
      titleAr: 'الأصالة الرقمية',
      des: 'We grew up on digital, but our approach goes beyond screens. With a deep understanding of the audience both online and offline, we’re in sync with constant shifts in their behavior. We combine digital expertise with a 180° perspective, using the latest tools and strategies to help brands thrive wherever their audience is, across every medium and experience.',
      desAr:
        'نشأنا في عالم الرقمنة، لكن نهجنا يتجاوز الشاشات. بفضل فهمنا العميق للجمهور عبر الإنترنت وخارجه، نحن متناغمون مع التحولات المستمرة في سلوكهم. نجمع بين الخبرة الرقمية والرؤية الشاملة، مستخدمين أحدث الأدوات والاستراتيجيات لمساعدة العلامات التجارية على الازدهار أينما كان جمهورها، عبر كل وسيلة وتجربة.',
    },
    {
      title: 'MEASURABLE GROWTH',
      titleAr: 'نمو قابل للقياس',
      des: 'We are focused on delivering more than just beautiful work; we deliver results. Our work is tied to measurable growth, ensuring that every strategy, every piece of content, and every campaign contributes to the success of our clients. At Rehla Marketing, we measure success not just by creativity but by the tangible, impactful outcomes we drive, always focused on achieving growth.',
      desAr:
        'نحن نركّز على تقديم ما هو أكثر من مجرد عمل جميل؛ نحن نحقق نتائج ملموسة. كل استراتيجية وكل محتوى وكل حملة نقوم بها تهدف إلى تعزيز نجاح عملائنا. في رحلة، نقيس النجاح ليس بالإبداع فقط، بل بالنتائج الحقيقية والمؤثرة التي نحققها، مع تركيز دائم على تحقيق النمو المستدام.',
    },
  ]

  const { locale } = useParams()

  return (
    <div className="max-w-6xl text-TextColor mx-auto p-4 md:p-6 flex flex-col gap-6 md:gap-8 lg:gap-10 min-h-full">
      <DnaHeader title={t('titleDna')} span={t('span')} />

      <div className="scrollable-container grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 overflow-y-auto px-2">
        {data.map((item, index) => (
          <div
            key={index}
            className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-all duration-300"
          >
            <h3 className="text-2xl md:text-3xl font-medium text-hover mb-4">
              {locale === 'en' ? item.title : item.titleAr}
            </h3>
            <p className="text-TextColor/60 text-base md:text-lg font-medium leading-relaxed">
              {locale === 'en' ? item.des : item.desAr}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DnaDes
