import React from 'react';
import { Beaker, Zap, FileText } from 'lucide-react';

interface NavbarProps {
  currentTime: string;
}

const Navbar: React.FC<NavbarProps> = ({ currentTime }) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-200">
      <nav className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <a href="https://www.sairamincubation.com/">
              {/*<Beaker className="h-8 w-8 text-blue-600" />*/}
              {/* <span className="text-lg font-semibold text-gray-800"><img src="https://imgs.search.brave.com/D6I27plDFvpb9A-pAUV8ZuZ70Wf1WpACxb6NBLcQTSE/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zYWly/YW1pbmN1YmF0aW9u/LmNvbS9pbmN1YmF0/b3ItbG9nby5wbmc"></img></span> */}
              <img 
  src="https://imgs.search.brave.com/D6I27plDFvpb9A-pAUV8ZuZ70Wf1WpACxb6NBLcQTSE/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zYWly/YW1pbmN1YmF0aW9u/LmNvbS9pbmN1YmF0/b3ItbG9nby5wbmc" 
  alt="Incubator Logo" 
  className="h-12 w-12 object-contain"
/>
</a>


            </div>
            <div className="h-6 w-px bg-gray-300" />
            <div className="flex items-center gap-2">
              <a href="">
              {/*<Zap className="h-8 w-8 text-green-600" />*/}
              {/* <span className="text-lg font-semibold text-gray-800">IncubationLogo</span> */}
              <img 
  src="data:image/jpeg;base64,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" 
  alt="Spark Logo" 
  className="h-12 w-12 object-contain"
/>
</a>

            </div>
          </div>
          
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
            <FileText className="h-4 w-4" />
            Report
          </button>
        </div>
      </nav>
      
      <div className="bg-gray-50 border-b border-gray-200 px-6 py-2">
        <div className="text-sm text-gray-600">
          <span className="font-medium">Biogas Monitoring Device</span>
          <span className="ml-4">{currentTime}</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;