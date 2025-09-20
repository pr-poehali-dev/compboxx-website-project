import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  category: 'computers' | 'components';
  image: string;
  warranty: string;
  specs: string[];
  inStock: boolean;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Gaming PC Pro',
    price: 89990,
    category: 'computers',
    image: '/img/ae4a67f0-0f8a-44e3-b248-5a56c4efd27a.jpg',
    warranty: 'WRT-2024-001',
    specs: ['Intel i7-13700K', 'RTX 4070 Ti', '32GB DDR5', '1TB NVMe SSD'],
    inStock: true
  },
  {
    id: 2,
    name: 'Office Workstation',
    price: 45990,
    category: 'computers',
    image: '/img/ae4a67f0-0f8a-44e3-b248-5a56c4efd27a.jpg',
    warranty: 'WRT-2024-002',
    specs: ['Intel i5-13400', 'GTX 1660 Super', '16GB DDR4', '512GB SSD'],
    inStock: true
  },
  {
    id: 3,
    name: 'AMD Ryzen 9 7900X',
    price: 32990,
    category: 'components',
    image: '/img/4bbd881d-b330-4b60-9be3-002e14bd1b41.jpg',
    warranty: 'WRT-2024-003',
    specs: ['12 ядер', '24 потока', '4.7 ГГц', 'AM5 Socket'],
    inStock: true
  },
  {
    id: 4,
    name: 'NVIDIA RTX 4080',
    price: 87990,
    category: 'components',
    image: '/img/4bbd881d-b330-4b60-9be3-002e14bd1b41.jpg',
    warranty: 'WRT-2024-004',
    specs: ['16GB GDDR6X', 'DLSS 3.0', 'Ray Tracing', '320W TDP'],
    inStock: false
  }
];

function Index() {
  const [cart, setCart] = useState<Product[]>([]);
  const [warrantySearch, setWarrantySearch] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const filteredProducts = products.filter(product => {
    if (activeTab === 'all') return true;
    if (activeTab === 'computers') return product.category === 'computers';
    if (activeTab === 'components') return product.category === 'components';
    return true;
  });

  const searchWarranty = () => {
    const found = products.find(p => p.warranty === warrantySearch);
    if (found) {
      alert(`Товар найден: ${found.name}\nГарантия действительна до: ${new Date(Date.now() + 730 * 24 * 60 * 60 * 1000).toLocaleDateString()}`);
    } else {
      alert('Гарантийный номер не найден');
    }
  };

  return (
    <div className="min-h-screen bg-white font-inter">
      {/* Header */}
      <header className="border-b border-gray-200 sticky top-0 bg-white/95 backdrop-blur-sm z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-gray-900">CompBoxx</h1>
              <nav className="hidden md:flex space-x-6">
                <a href="#" className="text-gray-600 hover:text-primary transition-colors">Главная</a>
                <a href="#" className="text-gray-600 hover:text-primary transition-colors">Комплектующие</a>
                <a href="#" className="text-gray-600 hover:text-primary transition-colors">Компьютеры</a>
                <a href="#" className="text-gray-600 hover:text-primary transition-colors">Доставка</a>
                <a href="#" className="text-gray-600 hover:text-primary transition-colors">Контакты</a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" className="relative">
                <Icon name="ShoppingCart" size={16} />
                {cart.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {cart.length}
                  </Badge>
                )}
              </Button>
              <Button size="sm">Войти</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-6 animate-fade-in">
            Компьютеры и комплектующие
          </h2>
          <p className="text-xl mb-8 text-blue-100 animate-fade-in">
            Высокое качество • Гарантия • Быстрая доставка
          </p>
          <Button size="lg" variant="secondary" className="animate-scale-in">
            Смотреть каталог
          </Button>
        </div>
      </section>

      {/* Warranty Tracking */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Shield" size={20} />
                Проверка гарантии
              </CardTitle>
              <CardDescription>
                Введите номер гарантийного талона
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  placeholder="WRT-2024-XXX"
                  value={warrantySearch}
                  onChange={(e) => setWarrantySearch(e.target.value)}
                />
                <Button onClick={searchWarranty}>
                  <Icon name="Search" size={16} />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Products Catalog */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">Каталог товаров</h3>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
              <TabsTrigger value="all">Все товары</TabsTrigger>
              <TabsTrigger value="computers">Компьютеры</TabsTrigger>
              <TabsTrigger value="components">Комплектующие</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 animate-fade-in">
                <div className="aspect-square overflow-hidden rounded-t-lg">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    {!product.inStock && (
                      <Badge variant="outline" className="text-red-600 border-red-200">
                        Нет в наличии
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="text-sm">
                    Гарантия: {product.warranty}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-2xl font-bold text-primary">
                      {product.price.toLocaleString()} ₽
                    </div>
                    <div className="space-y-1">
                      {product.specs.map((spec, index) => (
                        <div key={index} className="text-sm text-gray-600 flex items-center gap-1">
                          <Icon name="Check" size={12} className="text-green-500" />
                          {spec}
                        </div>
                      ))}
                    </div>
                    <Button
                      className="w-full"
                      onClick={() => addToCart(product)}
                      disabled={!product.inStock}
                    >
                      {product.inStock ? (
                        <>
                          <Icon name="Plus" size={16} className="mr-2" />
                          В корзину
                        </>
                      ) : (
                        'Нет в наличии'
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Truck" size={24} className="text-white" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Быстрая доставка</h4>
              <p className="text-gray-600">Доставка по Москве в день заказа</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Shield" size={24} className="text-white" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Гарантия качества</h4>
              <p className="text-gray-600">2 года гарантии на все товары</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Headphones" size={24} className="text-white" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Техподдержка 24/7</h4>
              <p className="text-gray-600">Консультации и помощь в любое время</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h5 className="text-xl font-bold mb-4">CompBoxx</h5>
              <p className="text-gray-400">
                Надежный партнер в мире компьютерных технологий
              </p>
            </div>
            <div>
              <h6 className="font-semibold mb-4">Каталог</h6>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Компьютеры</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Комплектующие</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Периферия</a></li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold mb-4">Поддержка</h6>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Гарантия</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Доставка</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Возврат</a></li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold mb-4">Контакты</h6>
              <ul className="space-y-2 text-gray-400">
                <li>+7 (495) 123-45-67</li>
                <li>info@compboxx.ru</li>
                <li>Москва, ул. Тверская, 1</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Index;