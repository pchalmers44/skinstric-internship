"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";

interface AnalysisData {
  race: Record<string, number>;
  age: Record<string, number>;
  gender: Record<string, number>;
}

type CategoryType = 'race' | 'age' | 'gender';
type ItemKey = string;

export default function ResultsPage() {
  const router = useRouter();
  const [data, setData] = useState<AnalysisData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('race');
  const [selectedRace, setSelectedRace] = useState<ItemKey | null>(null);
  const [selectedAge, setSelectedAge] = useState<ItemKey | null>(null);
  const [selectedGender, setSelectedGender] = useState<ItemKey | null>(null);

  useEffect(() => {
    const analysisData = localStorage.getItem('analysisData');
    if (analysisData) {
      try {
        const parsedData = JSON.parse(analysisData) as AnalysisData;
        setData(parsedData);
        // Set initial selected items to highest percentage in each category
        const topRace = Object.entries(parsedData.race).sort((a, b) => b[1] - a[1])[0]?.[0];
        const topAge = Object.entries(parsedData.age).sort((a, b) => b[1] - a[1])[0]?.[0];
        const topGender = Object.entries(parsedData.gender).sort((a, b) => b[1] - a[1])[0]?.[0];
        
        setSelectedRace(topRace || null);
        setSelectedAge(topAge || null);
        setSelectedGender(topGender || null);
      } catch (error) {
        console.error('Error parsing analysis data:', error);
      }
    }
    setLoading(false);
  }, []);

  const formatPercentage = (value: number): string => {
    return Math.round(value * 100) + '%';
  };

  const capitalizeLabel = (label: string): string => {
    return label
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const getSelectedValue = (): number | null => {
    if (!data) return null;
    if (selectedCategory === 'race' && selectedRace) {
      return data.race[selectedRace] || null;
    } else if (selectedCategory === 'age' && selectedAge) {
      return data.age[selectedAge] || null;
    } else if (selectedCategory === 'gender' && selectedGender) {
      return data.gender[selectedGender] || null;
    }
    return null;
  };

  const getSelectedLabel = (): string => {
    if (selectedCategory === 'race') return capitalizeLabel(selectedRace || '');
    if (selectedCategory === 'age') return (selectedAge || '') + ' y.o.';
    if (selectedCategory === 'gender') return capitalizeLabel(selectedGender || '');
    return '';
  };

  const getCategoryItems = (): [string, number][] => {
    if (!data) return [];
    return Object.entries(data[selectedCategory]).sort((a, b) => b[1] - a[1]);
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <style>{`
        @media (max-width: 1200px) {
          .results-main {
            gap: 20px !important;
            padding-top: 20px !important;
          }
          .results-sidebar {
            width: 220px !important;
          }
          .results-center,
          .results-right {
            height: 640px !important;
          }
          .results-right {
            width: 320px !important;
          }
        }

        @media (max-width: 900px) {
          .results-main {
            flex-direction: column !important;
            min-height: auto !important;
            padding-top: 16px !important;
            padding-bottom: 16px !important;
            gap: 16px !important;
          }
          .results-sidebar {
            width: 100% !important;
            display: grid !important;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 12px !important;
          }
          .results-category-btn {
            padding: 16px !important;
            min-height: 110px !important;
          }
          .results-center {
            width: 100% !important;
            height: auto !important;
          }
          .results-center-card {
            min-height: 420px !important;
            padding: 24px !important;
          }
          .results-selected-label {
            font-size: 32px !important;
          }
          .results-circle-anchor {
            position: static !important;
            margin-top: 16px !important;
            align-self: center !important;
          }
          .results-right {
            width: 100% !important;
            height: auto !important;
            max-height: 360px !important;
            padding: 20px !important;
          }
          .results-back-btn {
            position: static !important;
            margin: 20px 16px 0 16px !important;
            align-self: flex-start !important;
          }
          .results-bottom-bar {
            position: static !important;
            margin: 20px 16px 0 auto !important;
            justify-content: flex-end !important;
          }
          .results-hint {
            position: static !important;
            transform: none !important;
            margin: 12px 16px 20px 16px !important;
            text-align: center !important;
          }
        }

        @media (max-width: 640px) {
          .results-header-wrap {
            padding-left: 16px !important;
            padding-right: 16px !important;
            padding-top: 12px !important;
            padding-bottom: 12px !important;
          }
          .results-sidebar {
            grid-template-columns: 1fr !important;
          }
          .results-center-card {
            min-height: 340px !important;
            padding: 18px !important;
          }
          .results-selected-label {
            font-size: 26px !important;
          }
          .results-bottom-bar {
            width: calc(100% - 32px) !important;
            margin: 16px !important;
            display: grid !important;
            grid-template-columns: 1fr 1fr;
          }
          .results-bottom-bar button {
            width: 100% !important;
          }
          .results-hint p {
            font-size: 13px !important;
          }
        }
      `}</style>
      {/* Navbar */}
      <nav className="flex justify-between items-start px-4 md:px-8" style={{ height: '90px', fontSize: '10px', paddingTop: '17px' }}>
        <div>
          <button
            onClick={() => router.push('/')}
            className="font-bold tracking-wide"
            style={{ fontSize: '10px', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            SKINSTRIC<span className="text-gray-600 ml-2">[INTRO]</span>
          </button>
        </div>
        <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition font-semibold" style={{ fontSize: '10px' }}>
          ENTER CODE
        </button>
      </nav>

      {/* Header Section */}
      <div className="results-header-wrap" style={{ paddingLeft: '32px', paddingRight: '32px', paddingTop: '24px', paddingBottom: '24px' }}>
        <p style={{ fontSize: 'clamp(14px, 1.7vw, 16px)', fontWeight: 600, letterSpacing: '-0.02em', margin: 0, color: '#1A1B1C' }}>
          A.I. ANALYSIS
        </p>
        <h1 style={{ fontSize: 'clamp(38px, 7vw, 72px)', fontWeight: 400, letterSpacing: '-0.06em', margin: '0', color: '#1A1B1C', lineHeight: 1 }}>
          DEMOGRAPHICS
        </h1>
        <p style={{ fontSize: 'clamp(12px, 1.5vw, 14px)', fontWeight: 400, letterSpacing: '0', margin: 0, color: '#1A1B1C' }}>
          PREDICTED RACE & AGE
        </p>
      </div>

      {/* Main Content */}
      <div className="results-main flex-1 flex px-4 md:px-8 relative" style={{ minHeight: 'calc(100vh - 300px)', gap: '32px', paddingTop: '32px', alignItems: 'stretch', paddingBottom: '32px' }}>
        {loading ? (
          <p style={{ fontSize: '16px' }}>Loading analysis...</p>
        ) : data ? (
          <>
            {/* Left Sidebar - 3 Category Boxes */}
            <div className="results-sidebar" style={{ width: '280px', display: 'flex', flexDirection: 'column', gap: '24px', flexShrink: 0 }}>
              {/* Race Box */}
              <button
                onClick={() => setSelectedCategory('race')}
                className="results-category-btn"
                style={{
                  backgroundColor: selectedCategory === 'race' ? '#1A1B1C' : '#F3F3F4',
                  color: selectedCategory === 'race' ? 'white' : '#1A1B1C',
                  borderTop: '1px solid #1A1B1C',
                  borderLeft: 'none',
                  borderRight: 'none',
                  borderBottom: 'none',
                  padding: '32px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textAlign: 'left',
                  minHeight: '140px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <h2 style={{ fontSize: '18px', fontWeight: 600, margin: 0 }}>
                  {capitalizeLabel(selectedRace || '')}
                </h2>
                <h3 style={{ fontSize: '14px', fontWeight: 600, margin: 0, textTransform: 'uppercase', opacity: 1, color: selectedCategory === 'race' ? 'white' : '#1A1B1C' }}>
                  Race
                </h3>
              </button>

              {/* Age Box */}
              <button
                onClick={() => setSelectedCategory('age')}
                className="results-category-btn"
                style={{
                  backgroundColor: selectedCategory === 'age' ? '#1A1B1C' : '#F3F3F4',
                  color: selectedCategory === 'age' ? 'white' : '#1A1B1C',
                  borderTop: '1px solid #1A1B1C',
                  borderLeft: 'none',
                  borderRight: 'none',
                  borderBottom: 'none',
                  padding: '32px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textAlign: 'left',
                  minHeight: '140px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <h2 style={{ fontSize: '18px', fontWeight: 600, margin: 0 }}>
                  {selectedAge || ''}
                </h2>
                <h3 style={{ fontSize: '14px', fontWeight: 600, margin: 0, textTransform: 'uppercase', opacity: 1, color: selectedCategory === 'age' ? 'white' : '#1A1B1C' }}>
                  Age
                </h3>
              </button>

              {/* Gender Box */}
              <button
                onClick={() => setSelectedCategory('gender')}
                className="results-category-btn"
                style={{
                  backgroundColor: selectedCategory === 'gender' ? '#1A1B1C' : '#F3F3F4',
                  color: selectedCategory === 'gender' ? 'white' : '#1A1B1C',
                  borderTop: '1px solid #1A1B1C',
                  borderLeft: 'none',
                  borderRight: 'none',
                  borderBottom: 'none',
                  padding: '32px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textAlign: 'left',
                  minHeight: '140px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <h2 style={{ fontSize: '18px', fontWeight: 600, margin: 0 }}>
                  {capitalizeLabel(selectedGender || '')}
                </h2>
                <h3 style={{ fontSize: '14px', fontWeight: 600, margin: 0, textTransform: 'uppercase', opacity: 1, color: selectedCategory === 'gender' ? 'white' : '#1A1B1C' }}>
                  Gender
                </h3>
              </button>
            </div>

            {/* Center - Large Display Card */}
            <div className="results-center" style={{ flex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', minHeight: '0', boxSizing: 'border-box', height: '750px' }}>
              {getSelectedValue() !== null && (
                <div
                  className="results-center-card"
                  style={{
                    backgroundColor: '#F3F3F4',
                    borderTop: '1px solid #1A1B1C',
                    borderLeft: 'none',
                    borderRight: 'none',
                    borderBottom: 'none',
                    padding: '48px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '32px',
                    width: '100%',
                    boxSizing: 'border-box',
                    height: '100%',
                    position: 'relative',
                  }}
                >
                  {/* Item Label - Top Left */}
                  <div style={{ textAlign: 'left' }}>
                    <h2 className="results-selected-label" style={{ fontSize: 'clamp(28px, 3.6vw, 40px)', fontWeight: 400, margin: '0 0 8px 0', color: '#1A1B1C' }}>
                      {getSelectedLabel()}
                    </h2>
                  </div>

                  {/* Percentage Circle - Bottom Right */}
                  <div className="results-circle-anchor" style={{ position: 'absolute', bottom: '48px', right: '48px' }}>
                    <div
                      style={{
                        width: 'clamp(170px, 24vw, 384px)',
                        height: 'clamp(170px, 24vw, 384px)',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {/* SVG Circular Progress */}
                      <svg
                        width="384"
                        height="384"
                        viewBox="0 0 384 384"
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                      >
                        {/* White background circle */}
                        <circle
                          cx="192"
                          cy="192"
                          r="175"
                          fill="white"
                        />
                        {/* Background circle border */}
                        <circle
                          cx="192"
                          cy="192"
                          r="183"
                          fill="none"
                          stroke="#E5E5E5"
                          strokeWidth="4"
                        />
                        {/* Progress circle */}
                        <circle
                          cx="192"
                          cy="192"
                          r="183"
                          fill="none"
                          stroke="#1A1B1C"
                          strokeWidth="4"
                          strokeDasharray={1149.8}
                          strokeDashoffset={1149.8 * (1 - (getSelectedValue() || 0))}
                          strokeLinecap="round"
                          style={{
                            transform: 'rotate(-90deg)',
                            transformOrigin: '192px 192px',
                            transition: 'stroke-dashoffset 0.3s ease',
                          }}
                        />
                      </svg>
                      
                      {/* Text overlay */}
                      <span style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: 400, color: '#1A1B1C', position: 'relative', zIndex: 1 }}>
                        {formatPercentage(getSelectedValue()!)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Side - Items List */}
            <div
              className="results-right"
              style={{
                width: '400px',
                flexShrink: 0,
                backgroundColor: '#F3F3F4',
                borderTop: '1px solid #1A1B1C',
                borderLeft: 'none',
                borderRight: 'none',
                borderBottom: 'none',
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                overflowY: 'auto',
                minHeight: '0',
                height: '750px',
                boxSizing: 'border-box',
              }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 600, margin: 0, textTransform: 'uppercase', color: '#1A1B1C' }}>
                  {selectedCategory === 'race' && 'Race'}
                  {selectedCategory === 'age' && 'Age'}
                  {selectedCategory === 'gender' && 'Gender'}
                </h2>
                <span style={{ fontSize: '14px', fontWeight: 600, textTransform: 'uppercase', color: '#1A1B1C', opacity: 0.7 }}>
                  A.I. Confidence
                </span>
                </div>
              
              <ol
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                {getCategoryItems().map(([key, value]) => {
                  const isSelected =
                    (selectedCategory === 'race' && key === selectedRace) ||
                    (selectedCategory === 'age' && key === selectedAge) ||
                    (selectedCategory === 'gender' && key === selectedGender);

                  return (
                    <li
                      key={key}
                      onClick={() => {
                        if (selectedCategory === 'race') setSelectedRace(key);
                        else if (selectedCategory === 'age') setSelectedAge(key);
                        else if (selectedCategory === 'gender') setSelectedGender(key);
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        cursor: 'pointer',
                        padding: '12px 16px',
                        transition: 'all 0.2s ease',
                        backgroundColor: isSelected ? '#1A1B1C' : 'transparent',
                        color: isSelected ? 'white' : '#1A1B1C',
                      }}
                    >
                      {/* Diamond Bullet */}
                      <div
                        style={{
                          width: '10px',
                          height: '10px',
                          border: `2px solid ${isSelected ? 'white' : '#1A1B1C'}`,
                          transform: 'rotate(45deg)',
                          backgroundColor: isSelected ? 'white' : 'transparent',
                          flexShrink: 0,
                        }}
                      />
                      
                      {/* Item Label */}
                      <span
                        style={{
                          fontSize: '14px',
                          flex: 1,
                        }}
                      >
                        {capitalizeLabel(key)}
                      </span>
                      
                      {/* Percentage */}
                      <span
                        style={{
                          fontSize: '14px',
                          fontWeight: 600,
                          flexShrink: 0,
                        }}
                      >
                        {formatPercentage(value)}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </div>
          </>
        ) : (
          <p style={{ fontSize: '16px', color: '#666' }}>
            No analysis data available. Please upload an image first.
          </p>
        )}
      </div>

      {/* Back Button */}
      <button
        onClick={() => router.push('/select')}
        className="results-back-btn hover:opacity-70 transition"
        style={{
          position: 'fixed',
          bottom: '32px',
          left: '32px',
          opacity: 1,
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer'
        }}
      >
        <Image
          src="/back-button.svg"
          alt="Back"
          width={97}
          height={44}
        />
      </button>

      {/* Reset and Confirm Buttons */}
      <div
        className="results-bottom-bar"
        style={{
          position: 'fixed',
          bottom: '32px',
          right: '32px',
          display: 'flex',
          gap: '16px',
        }}
      >
        <button
          onClick={() => {
            if (data) {
              const topRace = Object.entries(data.race).sort((a, b) => b[1] - a[1])[0]?.[0];
              const topAge = Object.entries(data.age).sort((a, b) => b[1] - a[1])[0]?.[0];
              const topGender = Object.entries(data.gender).sort((a, b) => b[1] - a[1])[0]?.[0];
              setSelectedRace(topRace || null);
              setSelectedAge(topAge || null);
              setSelectedGender(topGender || null);
              setSelectedCategory('race');
            }
          }}
          style={{
            padding: '12px 24px',
            backgroundColor: '#F3F3F4',
            border: '2px solid #1A1B1C',
            borderRadius: '4px',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
            color: '#1A1B1C',
            transition: 'all 0.2s ease',
          }}
        >
          RESET
        </button>
        <button
          onClick={() => {
            // Confirm action - you can add your logic here
            router.push('/');
          }}
          style={{
            padding: '12px 24px',
            backgroundColor: '#1A1B1C',
            border: 'none',
            borderRadius: '4px',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
            color: 'white',
            transition: 'all 0.2s ease',
          }}
        >
          CONFIRM
        </button>
      </div>

      {/* Bottom Center Text */}
      <div
        className="results-hint"
        style={{
          position: 'fixed',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <p style={{ fontSize: '16px', fontWeight: 400, letterSpacing: '-0.02em', margin: 0, color: '#A0A4AB' }}>
          If A.I. estimate is wrong, select the correct one.
        </p>
      </div>
    </div>
  );
}

