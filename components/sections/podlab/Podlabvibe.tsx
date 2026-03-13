import Vibegrid from '../../ui/Vibegrid';

export default function Podlabvibe() {
  const podlabFeatures = [
    {
      icon: '/images/podlab/tablespace.png',
      title: 'Call Booths',
      description: 'For meetings and quite calls'
    },
    {
      icon: '/images/podlab/Flexibleuse.png',
      title: 'Flexible Use',
      description: 'Short or longer stays'
    },
    {
      icon: '/images/podlab/meeting.png',
      title: 'Meeting Room',
      description: 'Space to talk things through'
    },
    {
      icon: '/images/podlab/kitchen.png',
      title: 'Kitchenette',
      description: 'Space to refresh and recharge'
    },
    {
      icon: '/images/podlab/desk.png',
      title: 'Desk',
      description: 'Shared workspaces for focused days'
    },
    {
      icon: '/images/podlab/printer.png',
      title: 'Printing',
      description: 'Basics available when you need them'
    }
  ];

  return (
    <div>
      {/* Other sections of your cowork page */}
      
      <Vibegrid 
        items={podlabFeatures} 
        bgColor="bg-podlab" 
        textColor="text-white"
        textOpacity="text-white/90"
      />
      
      {/* More sections */}
    </div>
  );
}