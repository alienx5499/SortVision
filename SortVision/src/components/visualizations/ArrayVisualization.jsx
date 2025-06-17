import React, { useState, useEffect } from "react";
import "../../styles/animation.css"; // Assuming this path for your CSS

const ArrayVisualization = ({
  algorithm,
  array,
  currentBar,
  isSorting,
  currentTestingAlgo,
  isStopped,
  height = "h-96",
}) => {
  const [hoveredBarIndex, setHoveredBarIndex] = useState(null);

  useEffect(() => {
    if (isSorting === false && !isStopped) {
      for (let i = 0; i < 20; i++) {
        const el = document.createElement("div");
        el.className = "confetti";
        el.style.left = `${Math.random() * 90 + 5}%`;
        el.style.top = `${Math.random() * 50}px`;
        el.style.backgroundColor = ["#f59e0b", "#10b981", "#3b82f6"][i % 3];

        const container = document.querySelector(".group\\/viz");
        if (container) container.appendChild(el);

        setTimeout(() => el.remove(), 2000);
      }
    }
  }, [isSorting]);

  const getAlgorithmColor = () => {
    const currentAlgo = currentTestingAlgo || algorithm;
    switch (currentAlgo) {
      case "bubble":
        return { text: "text-red-400", glow: "shadow-red-500/30" };
      case "insertion":
        return { text: "text-orange-400", glow: "shadow-orange-500/30" };
      case "selection":
        return { text: "text-yellow-400", glow: "shadow-yellow-500/30" };
      case "quick":
        return { text: "text-green-400", glow: "shadow-green-500/30" };
      case "merge":
        return { text: "text-blue-400", glow: "shadow-blue-500/30" };
      case "radix":
        return { text: "text-purple-400", glow: "shadow-purple-500/30" };
      case "heap":
        return { text: "text-indigo-400", glow: "shadow-indigo-500/30" };
      case "bucket":
        return { text: "text-pink-400", glow: "shadow-pink-500/30" };
      default:
        return { text: "text-emerald-400", glow: "shadow-emerald-500/30" };
    }
  };

  const displayedAlgorithm = currentTestingAlgo || algorithm;

  return (
    <div className="relative group">
      <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-purple-500/20 rounded-xl blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative bg-slate-900 p-4 rounded border border-slate-800 transition-all duration-500 hover:border-slate-700 hover:shadow-lg hover:shadow-slate-900/50 group/viz overflow-hidden">
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute inset-0 bg-[radial-gradient(#444_1px,transparent_1px)] [background-size:8px_8px] opacity-30"></div>
            <div
              className="absolute h-2 w-2 rounded-full bg-blue-500/50 top-[10%] left-[20%] animate-pulse"
              style={{ animationDuration: "3s" }}
            ></div>
            <div
              className="absolute h-1 w-1 rounded-full bg-indigo-500/50 top-[30%] left-[70%] animate-pulse"
              style={{ animationDuration: "2.3s" }}
            ></div>
            <div
              className="absolute h-1.5 w-1.5 rounded-full bg-purple-500/50 top-[70%] left-[30%] animate-pulse"
              style={{ animationDuration: "4s" }}
            ></div>
            <div
              className="absolute h-1 w-1 rounded-full bg-cyan-500/50 top-[60%] left-[80%] animate-pulse"
              style={{ animationDuration: "3.5s" }}
            ></div>

            <div className="absolute top-[15%] left-0 h-px w-[30%] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent animate-moveRight"></div>
            <div className="absolute top-[45%] left-0 h-px w-[20%] bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent animate-moveRight"></div>
            <div className="absolute top-[75%] left-0 h-px w-[40%] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent animate-moveRight"></div>
          </div>
        </div>

        <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-md group-hover/viz:scale-150 transition-transform duration-700"></div>
        <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover/viz:w-full bg-gradient-to-r from-blue-500/50 via-indigo-500/50 to-purple-500/50 rounded transition-all duration-700"></div>

        <div className={`w-full ${height || "h-64"} relative z-10`}>
          <div
            className={`absolute inset-0 opacity-10 transition-opacity duration-500 ${
              isSorting ? "opacity-20" : ""
            }`}
          >
            {displayedAlgorithm === "bubble" && (
              <div className="absolute inset-0 bg-gradient-to-t from-red-500/10 to-transparent"></div>
            )}
            {displayedAlgorithm === "insertion" && (
              <div className="absolute inset-0 bg-gradient-to-t from-orange-500/10 to-transparent"></div>
            )}
            {displayedAlgorithm === "selection" && (
              <div className="absolute inset-0 bg-gradient-to-t from-amber-500/10 to-transparent"></div>
            )}
            {displayedAlgorithm === "quick" && (
              <div className="absolute inset-0 bg-gradient-to-t from-green-500/10 to-transparent"></div>
            )}
            {displayedAlgorithm === "merge" && (
              <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent"></div>
            )}
            {displayedAlgorithm === "radix" && (
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent"></div>
            )}
            {displayedAlgorithm === "heap" && (
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/10 to-transparent"></div>
            )}
            {displayedAlgorithm === "bucket" && (
              <div className="absolute inset-0 bg-gradient-to-t from-pink-500/10 to-transparent"></div>
            )}
          </div>

          <div
            className={`absolute top-2 right-2 font-mono text-xs opacity-20 ${
              getAlgorithmColor().text
            }`}
          >
            {displayedAlgorithm}_sort()
          </div>

          <div className="flex justify-evenly items-end h-[calc(100%-24px)] relative z-10 pb-2">
            {array.map((value, index) => {
              let barColor =
                "bg-gradient-to-t from-blue-600 via-cyan-500 to-indigo-400";
              let barGlow = "shadow-[0_0_10px_rgba(59,130,246,0.5)]";
              if (currentBar.compare === index) {
                barColor = "bg-gradient-to-t from-amber-600 to-amber-400";
                barGlow = "shadow-[0_0_12px_rgba(245,158,11,0.6)]";
              }
              if (currentBar.swap === index) {
                barColor = "bg-gradient-to-t from-red-600 to-red-400";
                barGlow = "shadow-[0_0_12px_rgba(239,68,68,0.6)]";
              }
              if (currentBar.compare !== index && currentBar.swap !== index) {
                if (displayedAlgorithm === "bubble")
                  barColor =
                    "bg-gradient-to-t from-blue-600 via-cyan-500 to-indigo-400";
                if (displayedAlgorithm === "insertion")
                  barColor =
                    "bg-gradient-to-t from-indigo-600 via-blue-500 to-cyan-400";
                if (displayedAlgorithm === "selection")
                  barColor =
                    "bg-gradient-to-t from-cyan-600 via-blue-500 to-indigo-400";
                if (displayedAlgorithm === "quick")
                  barColor =
                    "bg-gradient-to-t from-blue-600 via-indigo-500 to-cyan-400";
                if (displayedAlgorithm === "merge")
                  barColor =
                    "bg-gradient-to-t from-indigo-600 via-blue-500 to-cyan-400";
                if (displayedAlgorithm === "radix")
                  barColor =
                    "bg-gradient-to-t from-blue-600 via-cyan-500 to-indigo-400";
                if (displayedAlgorithm === "heap")
                  barColor =
                    "bg-gradient-to-t from-indigo-600 via-blue-500 to-cyan-400";
                if (displayedAlgorithm === "bucket")
                  barColor =
                    "bg-gradient-to-t from-blue-600 via-indigo-500 to-cyan-400";
              }
              if (hoveredBarIndex === index) {
                barGlow = "shadow-[0_0_15px_rgba(255,255,255,0.7)]";
              }
              return (
                <div
                  key={index}
                  className={`rounded-t ${barColor} ${barGlow} transition-all duration-200 relative hover:z-20 group/bar`}
                  style={{
                    width: `${Math.max(100 / array.length - 1, 2)}%`,
                    height: `${Math.max(value * 2.5, 5)}px`,
                    transition:
                      "height 0.2s ease-in-out, background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                  }}
                  onMouseEnter={() => setHoveredBarIndex(index)}
                  onMouseLeave={() => setHoveredBarIndex(null)}
                >
                  {hoveredBarIndex === index && (
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-slate-800 px-1.5 py-0.5 rounded text-[10px] text-slate-300 shadow-md z-30 whitespace-nowrap pointer-events-none border border-slate-700 animate-fadeIn">
                      {value}
                    </div>
                  )}
                  <div className="absolute inset-x-0 top-0 h-1 bg-white/30 rounded-t"></div>
                  <div
                    className={`absolute inset-0 bg-white/10 ${
                      hoveredBarIndex === index ? "opacity-100" : "opacity-0"
                    } transition-opacity duration-200 rounded-t`}
                  ></div>
                  <div className="absolute inset-0 w-0 group-hover/bar:w-full transition-all duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-t"></div>
                </div>
              );
            })}
          </div>

          {isSorting && (
            <div className="absolute top-2 left-2 flex items-center bg-slate-800/80 rounded px-2 py-1 text-xs text-slate-300 backdrop-blur-sm border border-slate-700/50 shadow-md transition-all duration-300">
              <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></div>
              <span className="font-mono">Sorting...</span>
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 py-1 px-2 bg-slate-900/90 backdrop-blur-sm text-xs text-slate-500 font-mono border-t border-slate-800/50 z-20 transition-all duration-300 group-hover/viz:bg-slate-800/90">
            <div className="flex justify-between items-center">
              <div>
                // {array.length} elements |{" "}
                {currentTestingAlgo ? (
                  <span className="text-indigo-400">{`${
                    currentTestingAlgo.charAt(0).toUpperCase() +
                    currentTestingAlgo.slice(1)
                  } Sort (Testing)`}</span>
                ) : (
                  <span className="text-blue-400">{`${
                    displayedAlgorithm.charAt(0).toUpperCase() +
                    displayedAlgorithm.slice(1)
                  } Sort`}</span>
                )}
                {isStopped && (
                  <span className="text-red-400 ml-2">// terminated</span>
                )}
              </div>
              <div className="flex items-center">
                {isSorting ? (
                  <span className="text-emerald-400 flex items-center">
                    <span className="inline-block w-1 h-1 bg-emerald-400 rounded-full mr-1 animate-ping"></span>
                    executing
                  </span>
                ) : (
                  <span className="text-amber-400">ready</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArrayVisualization;
