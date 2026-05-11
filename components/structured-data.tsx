export function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Тенёчек",
    "image": "https://teneck.top/og-image.jpg",
    "description": "Продажа и установка кондиционеров в Минске и по всей Беларуси",
    "@id": "https://teneck.top",
    "url": "https://teneck.top",
    "telephone": "+375293989777",
    "email": "vtenechke@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "ул. Ивановская 43А",
      "addressLocality": "Минск",
      "addressCountry": "BY"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 53.9,
      "longitude": 27.5667
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "09:00",
      "closes": "21:00"
    },
    "priceRange": "750-6000 BYN",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "127"
    },
    "sameAs": [
      "https://instagram.com/tenechek_by"
    ]
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Установка кондиционеров",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Тенёчек"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Беларусь"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Кондиционеры",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "LG EVO MAX",
            "brand": "LG"
          },
          "price": "2803",
          "priceCurrency": "BYN"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Haier Flexis",
            "brand": "Haier"
          },
          "price": "3340",
          "priceCurrency": "BYN"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Gree G-Tech Inverter",
            "brand": "Gree"
          },
          "price": "1550",
          "priceCurrency": "BYN"
        }
      ]
    }
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Сколько стоит установка кондиционера?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Стоимость монтажа от 400 BYN. В цену включены все материалы и работы. Гарантия на монтаж 5 лет."
        }
      },
      {
        "@type": "Question",
        "name": "Какая гарантия на кондиционеры?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Гарантия на кондиционеры до 10 лет в зависимости от модели. На монтаж — 5 лет."
        }
      },
      {
        "@type": "Question",
        "name": "Можно ли купить кондиционер в рассрочку?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Да, доступна рассрочка 0% по картам Халва, Черепаха, Карта покупок и через Альфа-банк."
        }
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  )
}
