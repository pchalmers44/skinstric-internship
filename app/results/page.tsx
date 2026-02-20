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
      {/* Navbar */}
      <nav className="flex justify-between items-start px-8" style={{ height: '90px', fontSize: '10px', paddingTop: '17px' }}>
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
      <div style={{ paddingLeft: '32px', paddingRight: '32px', paddingTop: '24px', paddingBottom: '24px' }}>
        <p style={{ fontSize: '16px', fontWeight: 600, letterSpacing: '-0.02em', margin: 0, color: '#1A1B1C' }}>
          A.I. ANALYSIS
        </p>
        <h1 style={{ fontSize: '72px', fontWeight: 400, letterSpacing: '-0.06em', margin: '0', color: '#1A1B1C' }}>
          DEMOGRAPHICS
        </h1>
        <p style={{ fontSize: '14px', fontWeight: 400, letterSpacing: '0', margin: 0, color: '#1A1B1C' }}>
          PREDICTED RACE & AGE
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex px-8 relative" style={{ minHeight: 'calc(100vh - 300px)', gap: '32px', paddingTop: '32px', alignItems: 'stretch', paddingBottom: '32px' }}>
        {loading ? (
          <p style={{ fontSize: '16px' }}>Loading analysis...</p>
        ) : data ? (
          <>
            {/* Left Sidebar - 3 Category Boxes */}
            <div style={{ width: '280px', display: 'flex', flexDirection: 'column', gap: '24px', flexShrink: 0 }}>
              {/* Race Box */}
              <button
                onClick={() => setSelectedCategory('race')}
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
            <div style={{ flex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', minHeight: '0', boxSizing: 'border-box', height: '750px' }}>
              {getSelectedValue() !== null && (
                <div
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
                    <h2 style={{ fontSize: '40px', fontWeight: 400, margin: '0 0 8px 0', color: '#1A1B1C' }}>
                      {getSelectedLabel()}
                    </h2>
                  </div>

                  {/* Percentage Circle - Bottom Right */}
                  <div style={{ position: 'absolute', bottom: '48px', right: '48px' }}>
                    <div
                      style={{
                        width: '384px',
                        height: '384px',
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
                        style={{ position: 'absolute', top: 0, left: 0 }}
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
                      <span style={{ fontSize: '40px', fontWeight: 400, color: '#1A1B1C', position: 'relative', zIndex: 1 }}>
                        {formatPercentage(getSelectedValue()!)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Side - Items List */}
            <div
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
        className="hover:opacity-70 transition"
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

