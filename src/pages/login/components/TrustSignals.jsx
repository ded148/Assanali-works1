import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const universityPartners = [
    {
      id: 1,
      name: 'МГУ им. М.В. Ломоносова',
      logo: 'https://images.unsplash.com/photo-1562774053-701939374585?w=120&h=60&fit=crop&crop=center',
      description: 'Московский государственный университет'
    },
    {
      id: 2,
      name: 'СПбГУ',
      logo: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=120&h=60&fit=crop&crop=center',
      description: 'Санкт-Петербургский государственный университет'
    },
    {
      id: 3,
      name: 'МФТИ',
      logo: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=120&h=60&fit=crop&crop=center',
      description: 'Московский физико-технический институт'
    },
    {
      id: 4,
      name: 'НИУ ВШЭ',
      logo: 'https://images.unsplash.com/photo-1607013251379-e6eecfffe234?w=120&h=60&fit=crop&crop=center',
      description: 'Национальный исследовательский университет "Высшая школа экономики"'
    }
  ];

  const certifications = [
    {
      id: 1,
      name: 'Рособрнадзор',
      icon: 'Shield',
      description: 'Лицензия на образовательную деятельность'
    },
    {
      id: 2,
      name: 'Минобрнауки РФ',
      icon: 'Award',
      description: 'Аккредитация программ'
    },
    {
      id: 3,
      name: 'ISO 27001',
      icon: 'Lock',
      description: 'Сертификат безопасности данных'
    }
  ];

  const statistics = [
    {
      id: 1,
      value: '50,000+',
      label: 'Активных студентов',
      icon: 'Users'
    },
    {
      id: 2,
      value: '1,200+',
      label: 'Преподавателей',
      icon: 'GraduationCap'
    },
    {
      id: 3,
      value: '95%',
      label: 'Трудоустройство выпускников',
      icon: 'TrendingUp'
    }
  ];

  return (
    <div className="space-y-8">
      {/* University Partners */}
      <div className="text-center">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">
          Партнеры университеты
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {universityPartners?.map((partner) => (
            <div
              key={partner?.id}
              className="flex flex-col items-center p-3 bg-muted/30 rounded-lg hover:bg-muted/50 nav-transition"
            >
              <div className="w-16 h-8 mb-2 overflow-hidden rounded">
                <Image
                  src={partner?.logo}
                  alt={partner?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs text-center text-muted-foreground font-medium">
                {partner?.name}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Certifications */}
      <div className="text-center">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">
          Сертификации и лицензии
        </h3>
        <div className="space-y-3">
          {certifications?.map((cert) => (
            <div
              key={cert?.id}
              className="flex items-center space-x-3 p-3 bg-success/10 border border-success/20 rounded-lg"
            >
              <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                <Icon name={cert?.icon} size={16} color="white" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-foreground">{cert?.name}</p>
                <p className="text-xs text-muted-foreground">{cert?.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Statistics */}
      <div className="text-center">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">
          Наши достижения
        </h3>
        <div className="space-y-3">
          {statistics?.map((stat) => (
            <div
              key={stat?.id}
              className="flex items-center space-x-3 p-3 bg-primary/10 border border-primary/20 rounded-lg"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Icon name={stat?.icon} size={16} color="white" />
              </div>
              <div className="text-left">
                <p className="text-lg font-bold text-primary">{stat?.value}</p>
                <p className="text-xs text-muted-foreground">{stat?.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Security Notice */}
      <div className="p-4 bg-muted/30 border border-border rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={16} className="text-primary mt-0.5" />
          <div>
            <p className="text-xs font-medium text-foreground mb-1">
              Безопасность данных
            </p>
            <p className="text-xs text-muted-foreground">
              Все данные защищены в соответствии с требованиями ФЗ-152 "О персональных данных"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;