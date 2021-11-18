const bcrypt = require("bcrypt");

export const data = {
  users: [
    {
      email: "plamen1@email.com",
      username: "Plamen",
      password: bcrypt.hashSync("123", 10),
      isAdmin: true,
      favouriteProducts: [],
    },
    {
      email: "test@email.com",
      username: "Test",
      password: bcrypt.hashSync("123", 10),
      isAdmin: false,
      favouriteProducts: [],
    },
  ],
  products: [
    {
      name: "Samsung Galaxy J6",
      images: [
        "/images/samsung-galaxy-j6.png",
        "/images/samsung-galaxy-j6(back-side).png",
        "/images/samsung-galaxy-j6(carousel).png",
      ],
      brand: "samsung",
      price: 359.99,
      cpu: "1.3GHz Apple A6",
      camera: "8mp (3264x2448)",
      size: "124.4mm x 59.2mm x 8.97mm (4.9 x 2.33 x 0.35)",
      weight: "132 grams (4.7 ounces) with battery",
      display: "4.0 326 pixel density",
      battery: "1480 mAh",
      memory: "32GB, RAM: 4",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur!",
      countInStock: 5,
      rating: 0,
      reviews: [],
    },
    {
      name: "Samsung Galaxy S10",
      images: [
        "/images/samsung-galaxy-s10.png",
        "/images/samsung-galaxy-s10(back-side).png",
        "/images/samsung-galaxy-s10(carousel).png",
      ],
      brand: "samsung",
      price: 499.99,
      cpu: "1.3GHz Apple A6",
      camera: "8mp (3264x2448)",
      size: "124.4mm x 59.2mm x 8.97mm (4.9 x 2.33 x 0.35)",
      weight: "132 grams (4.7 ounces) with battery",
      display: "4.0 326 pixel density",
      battery: "1480 mAh",
      memory: "64GB, RAM: 4",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur!",
      countInStock: 4,
      rating: 0,
      reviews: [],
    },
    {
      name: "Samsung Galaxy a71",
      images: [
        "/images/samsung-galaxy-a71.png",
        "/images/samsung-galaxy-a71(back-side).png",
        "/images/samsung-galaxy-a71(carousel).png",
      ],
      brand: "samsung",
      price: 529.99,
      cpu: "1.3GHz Apple A6",
      camera: "8mp (3264x2448)",
      size: "124.4mm x 59.2mm x 8.97mm (4.9 x 2.33 x 0.35)",
      weight: "132 grams (4.7 ounces) with battery",
      display: "4.0 326 pixel density",
      battery: "1480 mAh",
      memory: "64GB, RAM: 4",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur!",
      countInStock: 6,
      rating: 0,
      reviews: [],
    },
    {
      name: "Samsung Galaxy a51",
      images: [
        "/images/samsung-galaxy-a51.png",
        "/images/samsung-galaxy-a51(back-side).png",
        "/images/samsung-galaxy-a51(carousel).png",
      ],
      brand: "samsung",
      price: 459.99,
      cpu: "1.3GHz Apple A6",
      camera: "8mp (3264x2448)",
      size: "124.4mm x 59.2mm x 8.97mm (4.9 x 2.33 x 0.35)",
      weight: "132 grams (4.7 ounces) with battery",
      display: "4.0 326 pixel density",
      battery: "1480 mAh",
      memory: "64GB, RAM: 4",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur!",
      countInStock: 5,
      rating: 0,
      reviews: [],
    },
    {
      name: "Huawei p20 PRO",
      images: [
        "/images/huawei-p20.png",
        "/images/huawei-p20(back-side).png",
        "/images/huawei-p20(carousel).png",
      ],
      brand: "huawei",
      price: 479.99,
      cpu: "1.3GHz Apple A6",
      camera: "8mp (3264x2448)",
      size: "124.4mm x 59.2mm x 8.97mm (4.9 x 2.33 x 0.35)",
      weight: "132 grams (4.7 ounces) with battery",
      display: "4.0 326 pixel density",
      battery: "1480 mAh",
      memory: "64GB, RAM: 4",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur!",
      countInStock: 3,
      rating: 0,
      reviews: [],
    },
    {
      name: "Huawei p40 LITE",
      images: [
        "/images/huawei-p40-lite.png",
        "/images/huawei-p40-lite(back-side).png",
        "/images/huawei-p40-lite(carousel).png",
      ],
      brand: "huawei",
      price: 499.99,
      cpu: "1.3GHz Apple A6",
      camera: "8mp (3264x2448)",
      size: "124.4mm x 59.2mm x 8.97mm (4.9 x 2.33 x 0.35)",
      weight: "132 grams (4.7 ounces) with battery",
      display: "4.0 326 pixel density",
      battery: "1480 mAh",
      memory: "64GB, RAM: 4",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur!",
      countInStock: 4,
      rating: 0,
      reviews: [],
    },
    {
      name: "Lenovo k6 NOTE",
      images: [
        "/images/lenovo-k6-note.png",
        "/images/lenovo-k6-note(back-side).png",
        "/images/lenovo-k6-note(carousel).png",
      ],
      brand: "lenovo",
      price: 329.99,
      cpu: "1.3GHz Apple A6",
      camera: "8mp (3264x2448)",
      size: "124.4mm x 59.2mm x 8.97mm (4.9 x 2.33 x 0.35)",
      weight: "132 grams (4.7 ounces) with battery",
      display: "4.0 326 pixel density",
      battery: "1480 mAh",
      memory: "32GB, RAM: 2",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur!",
      countInStock: 5,
      rating: 0,
      reviews: [],
    },
    {
      name: "Huawei Y6p",
      images: [
        "/images/huawei-y6p.png",
        "/images/huawei-y6p(back-side).png",
        "/images/huawei-y6p(carousel).png",
      ],
      brand: "huawei",
      price: 469.99,
      cpu: "1.3GHz Apple A6",
      camera: "8mp (3264x2448)",
      size: "124.4mm x 59.2mm x 8.97mm (4.9 x 2.33 x 0.35)",
      weight: "132 grams (4.7 ounces) with battery",
      display: "4.0 326 pixel density",
      battery: "1480 mAh",
      memory: "64GB, RAM: 4",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur!",
      countInStock: 6,
      rating: 0,
      reviews: [],
    },
    {
      name: "Huawei Y7",
      images: [
        "/images/huawei-y7.png",
        "/images/huawei-y7(back-side).png",
        "/images/huawei-y7(carousel).png",
      ],
      brand: "huawei",
      price: 599.99,
      cpu: "1.3GHz Apple A6",
      camera: "8mp (3264x2448)",
      size: "124.4mm x 59.2mm x 8.97mm (4.9 x 2.33 x 0.35)",
      weight: "132 grams (4.7 ounces) with battery",
      display: "4.0 326 pixel density",
      battery: "1480 mAh",
      memory: "64GB, RAM: 8",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur!",
      countInStock: 2,
      rating: 0,
      reviews: [],
    },
  ],
};
