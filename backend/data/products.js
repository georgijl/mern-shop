const products = [
  {
    name: "PlayStation 5",
    imageUrl:
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80",
    description:
      "PlayStation 5 (PS5) is a home video game console developed by Sony Interactive Entertainment. Announced in 2019 as the successor to the PlayStation 4, the PS5 was released on November 12, 2020 in Australia, Japan, New Zealand, North America, Singapore, and South Korea, and November 19, 2020 onwards in other major markets except China and India.",
    price: 499,
    countInStock: 15,
  },
  {
    name: "Iphone 12",
    imageUrl:
      "https://images.unsplash.com/photo-1605787020600-b9ebd5df1d07?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1463&q=80",
    description:
      "Welcome to a new era of iPhone. Beautifully bright 6.1-inch Super Retina XDR display.1 Ceramic Shield with 4x better drop performance.2 Incredible low-light photography with Night mode on all cameras. Cinema-grade Dolby Vision video recording, editing, and playback. Powerful A14 Bionic chip. And new MagSafe accessories for easy attach and faster wireless charging.3 Let the fun begin.",
    price: 1099,
    countInStock: 10,
  },
  {
    name: "Cannon EOS-1D",
    imageUrl:
      "https://images.unsplash.com/photo-1519183071298-a2962feb14f4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    description:
      "The EOS-1D X combines speed with image quality, to create the next generation camera for professionals. Full frame 18 megapixel sensor with Dual “DIGIC 5+” processors sets the standard, and up to 12 frames per second shooting takes it beyond.",
    price: 1300,
    countInStock: 5,
  },
  {
    name: "Amazon Alexa",
    imageUrl:
      "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80",
    description:
      "It is capable of voice interaction, music playback, making to-do lists, setting alarms, streaming podcasts, playing audiobooks, and providing weather, traffic, sports, and other real-time information, such as news. Alexa can also control several smart devices using itself as a home automation system.",
    price: 50,
    countInStock: 25,
  },
  {
    name: "Audio Technica Headphones",
    imageUrl:
      "https://images.unsplash.com/photo-1558756520-22cfe5d382ca?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    description:
      "Outfitted with 45mm large-aperture dynamic drivers and an over-ear, closed-back design, the ATH-M50x headphones deliver clarity, deep bass, and extended bandwidth (15 Hz to 28 kHz) while isolating you from outside sounds.",
    price: 233,
    countInStock: 4,
  },
  {
    name: "JBL FLIP 4",
    imageUrl:
      "https://images.unsplash.com/photo-1564424224827-cd24b8915874?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80",
    description:
      "JBL Flip 4 is the next generation in the award-winning Flip series; it is a portable Bluetooth speaker that delivers surprisingly powerful stereo sound. This compact speaker is powered by a 3000mAh rechargeable Li-ion battery that offers up to 12 hours of continuous, high-quality audio playtime.",
    price: 140,
    countInStock: 10,
  },
  {
    name: "HuiBOYS Wireless BT",
    imageUrl: "https://m.media-amazon.com/images/I/51PVotnCmrS._AC_UX679_.jpg",
    description:
      "Built-in microphone. One button to answer/hang up a call. Support voice prompt and number report when a call is received.Wireless music streaming is supported, 6 hours music time per charge In-ear Single multi-function button, built-in microphone, 5 hours talk time per charge, 2 hours charging time, USB charging cable included Invisible, smallest and ultra-light design. Free from cable ties, bring more comfort during training, sports and other activities. Free yourself from the hassle of getting wire. Built-in microphone. One button to answer/hang up a call. Support voice prompt and number report when a call is received. Wireless music streaming is supported, 6 hours music time per charge. Single multi-function button, built-in microphone, 5 hours talk time per charge, 2 hours charging time, USB charging cable included. Invisible, smallest and ultra-light design. Free from cable ties, bring more comfort",
    price: 39.99,
    countInStock: 25,
  },
  {
    name: "Samsung Galaxy Tab S6 Lite",
    imageUrl: "https://m.media-amazon.com/images/I/71fX8ThiZVL._AC_SX569_.jpg",
    description:
      "Das brillante 10, 4 große Display macht die Arbeit zum Vergnügen und Gaming zu einem besonderen Ereignis Der vielseitige S Pen schreibt, zeichnet und ist jederzeit einsatzbereit ob Sie arbeiten oder Ihrer Kreativität Ausdruck verleihen Das Galaxy Tab S6 Lite ist dank seines nahtlosen, metallischen Unibody schlank und leicht Mit der leistungsstarken Sicherheitsplattform Samsung Knox ist das Galaxy Tab S6 Lite auf mehreren Ebenen vor Angriffen und Eindringlingen geschützt Der ausdauernde Akku mit 7 040 mAh macht problemlos auch lange Arbeitstage oder einen Serienmarathon mit Mit schnellen Ladezeiten, flüssigem Gaming und erweiterbarem Speicher sind Sie auf jede Situation vorbereitet Erleben Sie dreidimensionalen Sound, der Ihr Entertainment mit intensivem Hörgenuss unterstreicht. WLAN: 802.11 a/b/g/n/ac 2,4 G + 5 GHz, VHT80 MIMO, Bluetooth 5.0.",
    price: 255,
    countInStock: 65,
  },
  {
    name: "Google Chromecast, Carbon, Unlimited Streaming",
    imageUrl: "https://m.media-amazon.com/images/I/61o5Ho2Iy5L._AC_SX679_.jpg",
    description:
      "Stream to TV from smartphone. It doesn't get any easier than this. Whether movies, series, live TV, YouTube or photos: Streaming has never been so easy. 1. Connect Chromecast to the HDMI port of your TV and stream directly from your smartphone with just one tap. You can watch shows, play playlists and much more. And you can continue using your smartphone normally when streaming",
    price: 39,
    countInStock: 15,
  },
  {
    name: "Fire TV Stick 4K Ultra HD",
    imageUrl: "https://m.media-amazon.com/images/I/61BS5r-6kXL._AC_SX679_.jpg",
    description:
      "Launch and control your favourite movies and TV shows with the Alexa Voice Remote. Use the dedicated power, volume and mute buttons to control your compatible TV, soundbar and receiver.",
    price: 39.99,
    countInStock: 10,
  },
  {
    name: "EarPods with Lightning Connector",
    imageUrl: "https://m.media-amazon.com/images/I/41wYbyr3LLL._AC_SX679_.jpg",
    description:
      "The EarPods with Lightning Connector have an integrated remote control that lets you adjust the volume, control the playback of music and videos and accept and end calls at the touch of a button.",
    price: 13.42,
    countInStock: 95,
  },
  {
    name: "Grefay Universal Bicycle Mobile Phone Holder for 3.5 - 6.5 In.",
    imageUrl: "https://m.media-amazon.com/images/I/61w1AH0K-oL._AC_SY450_.jpg",
    description:
      "Easy installation: convenient tool-free installation makes it easy to attach to any bike handlebars, for which you only need to locate the nut and lock it.",
    price: 11.54,
    countInStock: 80,
  },
  {
    name: "Mobile Phone Holder for Car",
    imageUrl: "https://m.media-amazon.com/images/I/61SeV1iuIWL._AC_SX569_.jpg",
    description:
      "Easy to Install: It can not affect your windscreen view, one hand operation of the phone, easy to install in the car air vent.",
    price: 11.04,
    countInStock: 62,
  },
];

module.exports = products;
