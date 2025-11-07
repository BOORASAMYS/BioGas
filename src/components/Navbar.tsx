import React from 'react';
import { FileText } from 'lucide-react';

interface NavbarProps {
  currentTime: string;
}

const Navbar: React.FC<NavbarProps> = ({ currentTime }) => {
  const handleExport = async () => {
    try {
      const response = await fetch("https://biogas-backend-zk70.onrender.com/export-and-delete");

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      // Convert response to a blob (binary data)
      const blob = await response.blob();

      // Try to extract filename from response header (if backend sends it)
      const disposition = response.headers.get("Content-Disposition");
      let filename = "BioGas_Report.xlsx";
      if (disposition && disposition.includes("filename=")) {
        filename = disposition
          .split("filename=")[1]
          .replace(/"/g, "")
          .trim();
      }

      // Create a temporary download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();

      // Cleanup
      link.remove();
      window.URL.revokeObjectURL(url);

      console.log("✅ Report downloaded successfully.");
    } catch (error) {
      console.error("❌ Error exporting report:", error);
      alert("Failed to download report. Please try again.");
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-200">
      <nav className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="https://www.sairamincubation.com/">
              <img
                src="https://imgs.search.brave.com/D6I27plDFvpb9A-pAUV8ZuZ70Wf1WpACxb6NBLcQTSE/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zYWly/YW1pbmN1YmF0aW9u/LmNvbS9pbmN1YmF0/b3ItbG9nby5wbmc"
                alt="Incubator Logo"
                className="h-12 w-12 object-contain"
              />
            </a>
            <div className="h-6 w-px bg-gray-300" />
            <a href="#">
              <img
                src="https://via.placeholder.com/48x48?text=Spark"
                alt="Spark Logo"
                className="h-12 w-12 object-contain"
              />
            </a>
          </div>

          <button
            onClick={handleExport}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
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
