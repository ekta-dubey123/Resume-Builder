import React, { useEffect, useState, useRef } from 'react'
import {
  ArrowLeftIcon,
  UserIcon,
  FileTextIcon,
  GraduationCapIcon,
  BriefcaseIcon,
  FolderIcon,
  ZapIcon,
  CheckIcon,
  PlusIcon,
  TrashIcon,
  SparklesIcon,
  DownloadIcon,
  EyeIcon,
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const accentColors = [
  '#9BFF4F', '#00E5FF', '#FF4FD8', '#FFD700', '#FF6B4F', '#4FFF9B', '#B44FFF',
];

const templates = [
  { id: 'classic', name: 'Classic', description: 'Traditional two-column layout' },
  { id: 'modern', name: 'Modern', description: 'Bold header, clean sections' },
  { id: 'minimal', name: 'Minimal', description: 'Whitespace-first, typography-led' },
  { id: 'creative', name: 'Creative', description: 'Sidebar accent with flair' },
];

const sectionDefs = [
  { id: 'personal',   label: 'Personal',   icon: UserIcon },
  { id: 'summary',    label: 'Summary',    icon: FileTextIcon },
  { id: 'education',  label: 'Education',  icon: GraduationCapIcon },
  { id: 'experience', label: 'Experience', icon: BriefcaseIcon },
  { id: 'projects',   label: 'Projects',   icon: FolderIcon },
  { id: 'skills',     label: 'Skills',     icon: ZapIcon },
];

const empty = {
  _id: '',
  title: 'My Resume',
  personalInfo: { fullName: '', email: '', phone: '', location: '', profession: '' },
  summary: '',
  education:   [{ college: '', degree: '', year: '' }],
  experience:  [{ company: '', role: '', duration: '', description: '' }],
  projects:    [{ title: '', description: '', link: '' }],
  skills:      [],
  template:    'modern',
  accent_color: '#9BFF4F',
  public: false,
};

// ---------- tiny helpers ----------
const Field = ({ label, value, onChange, placeholder, type = 'text', rows }) => (
  <div style={{ marginBottom: 14 }}>
    {label && (
      <label style={{
        display: 'block', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em',
        textTransform: 'uppercase', color: '#6b7280', marginBottom: 6,
      }}>{label}</label>
    )}
    {rows ? (
      <textarea
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={fieldStyle}
      />
    ) : (
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={fieldStyle}
      />
    )}
  </div>
);

const fieldStyle = {
  width: '100%', boxSizing: 'border-box',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.09)',
  borderRadius: 10,
  padding: '11px 14px',
  color: '#e5e7eb',
  fontSize: 14,
  outline: 'none',
  resize: 'vertical',
  fontFamily: 'inherit',
  transition: 'border-color 0.2s',
};

const SectionTitle = ({ children }) => (
  <h2 style={{
    fontSize: 13, fontWeight: 700, letterSpacing: '0.1em',
    textTransform: 'uppercase', color: '#9BFF4F',
    margin: '0 0 18px', display: 'flex', alignItems: 'center', gap: 8,
  }}>
    <span style={{ flex: 1, height: 1, background: 'rgba(155,255,79,0.2)' }} />
    {children}
    <span style={{ flex: 1, height: 1, background: 'rgba(155,255,79,0.2)' }} />
  </h2>
);

// ========== PREVIEW TEMPLATES ==========

const ClassicPreview = ({ resume }) => {
  const c = resume.accent_color;
  return (
    <div style={{ fontFamily: '"Georgia", serif', color: '#1a1a1a', background: '#fff', minHeight: '100%' }}>
      <div style={{ borderBottom: `4px solid ${c}`, padding: '32px 36px 24px' }}>
        <h1 style={{ margin: 0, fontSize: 32, fontWeight: 700, letterSpacing: '-0.5px' }}>
          {resume.personalInfo?.fullName || 'Your Name'}
        </h1>
        <p style={{ margin: '6px 0 0', fontSize: 15, color: '#555', fontStyle: 'italic' }}>
          {resume.personalInfo?.profession || 'Profession'}
        </p>
        <div style={{ marginTop: 12, display: 'flex', gap: 20, fontSize: 12, color: '#666', flexWrap: 'wrap' }}>
          {resume.personalInfo?.email && <span>✉ {resume.personalInfo.email}</span>}
          {resume.personalInfo?.phone && <span>✆ {resume.personalInfo.phone}</span>}
          {resume.personalInfo?.location && <span>⌖ {resume.personalInfo.location}</span>}
        </div>
      </div>
      <div style={{ padding: '24px 36px' }}>
        <PreviewSection title="Summary" accent={c}>
          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: '#444' }}>{resume.summary || 'Your professional summary...'}</p>
        </PreviewSection>
        <PreviewSection title="Experience" accent={c}>
          {resume.experience?.map((e, i) => e.role && (
            <div key={i} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <strong style={{ fontSize: 13 }}>{e.role}</strong>
                <span style={{ fontSize: 11, color: '#888' }}>{e.duration}</span>
              </div>
              <div style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>{e.company}</div>
              <p style={{ fontSize: 12, color: '#555', margin: 0, lineHeight: 1.6 }}>{e.description}</p>
            </div>
          ))}
        </PreviewSection>
        <PreviewSection title="Education" accent={c}>
          {resume.education?.map((ed, i) => ed.degree && (
            <div key={i} style={{ marginBottom: 10 }}>
              <strong style={{ fontSize: 13 }}>{ed.degree}</strong>
              <div style={{ fontSize: 12, color: '#666' }}>{ed.college} {ed.year && `· ${ed.year}`}</div>
            </div>
          ))}
        </PreviewSection>
        <PreviewSection title="Projects" accent={c}>
          {resume.projects?.map((p, i) => p.title && (
            <div key={i} style={{ marginBottom: 10 }}>
              <strong style={{ fontSize: 13 }}>{p.title}</strong>
              <p style={{ fontSize: 12, color: '#555', margin: '2px 0 0', lineHeight: 1.6 }}>{p.description}</p>
            </div>
          ))}
        </PreviewSection>
        <PreviewSection title="Skills" accent={c}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {resume.skills?.map((s, i) => s.trim() && (
              <span key={i} style={{
                padding: '3px 10px', borderRadius: 20, fontSize: 11, fontFamily: 'sans-serif',
                background: `${c}22`, border: `1px solid ${c}55`, color: '#222',
              }}>{s.trim()}</span>
            ))}
          </div>
        </PreviewSection>
      </div>
    </div>
  );
};

const ModernPreview = ({ resume }) => {
  const c = resume.accent_color;
  return (
    <div style={{ fontFamily: '"Inter", "Helvetica Neue", sans-serif', color: '#111', background: '#fff', minHeight: '100%' }}>
      <div style={{ background: '#0d0d0d', padding: '36px 36px 28px', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: -40, right: -40, width: 200, height: 200,
          borderRadius: '50%', background: `${c}22`,
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-block', background: c, height: 3, width: 40, borderRadius: 2, marginBottom: 12 }} />
          <h1 style={{ margin: 0, fontSize: 34, fontWeight: 800, color: '#fff', letterSpacing: '-0.5px' }}>
            {resume.personalInfo?.fullName || 'Your Name'}
          </h1>
          <p style={{ margin: '6px 0 16px', fontSize: 14, color: c, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            {resume.personalInfo?.profession || 'Profession'}
          </p>
          <div style={{ display: 'flex', gap: 16, fontSize: 11, color: 'rgba(255,255,255,0.6)', flexWrap: 'wrap' }}>
            {resume.personalInfo?.email && <span>{resume.personalInfo.email}</span>}
            {resume.personalInfo?.phone && <span>{resume.personalInfo.phone}</span>}
            {resume.personalInfo?.location && <span>{resume.personalInfo.location}</span>}
          </div>
        </div>
      </div>
      <div style={{ padding: '24px 36px' }}>
        <PreviewSection title="About" accent={c} modern>
          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: '#555' }}>{resume.summary || 'Your professional summary...'}</p>
        </PreviewSection>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div>
            <PreviewSection title="Experience" accent={c} modern>
              {resume.experience?.map((e, i) => e.role && (
                <div key={i} style={{ marginBottom: 14, paddingLeft: 12, borderLeft: `2px solid ${c}` }}>
                  <strong style={{ fontSize: 12 }}>{e.role}</strong>
                  <div style={{ fontSize: 11, color: '#888' }}>{e.company} {e.duration && `· ${e.duration}`}</div>
                  <p style={{ fontSize: 11, color: '#666', margin: '4px 0 0', lineHeight: 1.5 }}>{e.description}</p>
                </div>
              ))}
            </PreviewSection>
            <PreviewSection title="Education" accent={c} modern>
              {resume.education?.map((ed, i) => ed.degree && (
                <div key={i} style={{ marginBottom: 10, paddingLeft: 12, borderLeft: `2px solid ${c}44` }}>
                  <strong style={{ fontSize: 12 }}>{ed.degree}</strong>
                  <div style={{ fontSize: 11, color: '#888' }}>{ed.college} {ed.year && `· ${ed.year}`}</div>
                </div>
              ))}
            </PreviewSection>
          </div>
          <div>
            <PreviewSection title="Projects" accent={c} modern>
              {resume.projects?.map((p, i) => p.title && (
                <div key={i} style={{ marginBottom: 10 }}>
                  <strong style={{ fontSize: 12 }}>{p.title}</strong>
                  <p style={{ fontSize: 11, color: '#666', margin: '2px 0 0', lineHeight: 1.5 }}>{p.description}</p>
                </div>
              ))}
            </PreviewSection>
            <PreviewSection title="Skills" accent={c} modern>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                {resume.skills?.map((s, i) => s.trim() && (
                  <span key={i} style={{
                    padding: '2px 8px', borderRadius: 4, fontSize: 10, fontWeight: 600,
                    background: `${c}18`, color: '#111', border: `1px solid ${c}44`,
                  }}>{s.trim()}</span>
                ))}
              </div>
            </PreviewSection>
          </div>
        </div>
      </div>
    </div>
  );
};

const MinimalPreview = ({ resume }) => {
  const c = resume.accent_color;
  return (
    <div style={{ fontFamily: '"Helvetica Neue", Arial, sans-serif', color: '#1a1a1a', background: '#fff', minHeight: '100%', padding: '40px 48px' }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 300, letterSpacing: '-0.5px', color: '#111' }}>
          {resume.personalInfo?.fullName || 'Your Name'}
        </h1>
        <p style={{ margin: '4px 0 12px', fontSize: 13, color: '#888', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          {resume.personalInfo?.profession || 'Profession'}
        </p>
        <div style={{ display: 'flex', gap: 16, fontSize: 11, color: '#aaa' }}>
          {resume.personalInfo?.email && <span>{resume.personalInfo.email}</span>}
          {resume.personalInfo?.phone && <span>{resume.personalInfo.phone}</span>}
          {resume.personalInfo?.location && <span>{resume.personalInfo.location}</span>}
        </div>
        <div style={{ marginTop: 20, height: 1, background: '#e5e5e5' }} />
      </div>
      {resume.summary && (
        <p style={{ fontSize: 13, color: '#555', lineHeight: 1.8, marginBottom: 28 }}>{resume.summary}</p>
      )}
      {resume.experience?.[0]?.role && (
        <MinimalSection title="Experience" accent={c}>
          {resume.experience.map((e, i) => e.role && (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 16, marginBottom: 16 }}>
              <div style={{ fontSize: 11, color: '#aaa', paddingTop: 1 }}>{e.duration || e.company}</div>
              <div>
                <strong style={{ fontSize: 13 }}>{e.role}</strong>
                {e.company && <span style={{ fontSize: 12, color: '#888', marginLeft: 6 }}>at {e.company}</span>}
                <p style={{ fontSize: 12, color: '#666', margin: '4px 0 0', lineHeight: 1.6 }}>{e.description}</p>
              </div>
            </div>
          ))}
        </MinimalSection>
      )}
      {resume.education?.[0]?.degree && (
        <MinimalSection title="Education" accent={c}>
          {resume.education.map((ed, i) => ed.degree && (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 16, marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: '#aaa', paddingTop: 1 }}>{ed.year}</div>
              <div>
                <strong style={{ fontSize: 13 }}>{ed.degree}</strong>
                <div style={{ fontSize: 12, color: '#888' }}>{ed.college}</div>
              </div>
            </div>
          ))}
        </MinimalSection>
      )}
      {resume.skills?.length > 0 && (
        <MinimalSection title="Skills" accent={c}>
          <p style={{ fontSize: 13, color: '#555', margin: 0 }}>{resume.skills.filter(s => s.trim()).join(' · ')}</p>
        </MinimalSection>
      )}
    </div>
  );
};

const CreativePreview = ({ resume }) => {
  const c = resume.accent_color;
  return (
    <div style={{ fontFamily: '"Inter", "Helvetica Neue", sans-serif', display: 'grid', gridTemplateColumns: '200px 1fr', minHeight: '100%' }}>
      <div style={{ background: '#0d0d0d', padding: '32px 20px', color: '#fff' }}>
        <div style={{
          width: 64, height: 64, borderRadius: '50%',
          background: `${c}33`, border: `3px solid ${c}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 22, fontWeight: 700, color: c, marginBottom: 16,
        }}>
          {(resume.personalInfo?.fullName || 'Y').charAt(0).toUpperCase()}
        </div>
        <h2 style={{ margin: '0 0 4px', fontSize: 16, fontWeight: 700, color: '#fff' }}>
          {resume.personalInfo?.fullName || 'Your Name'}
        </h2>
        <p style={{ margin: '0 0 20px', fontSize: 10, color: c, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          {resume.personalInfo?.profession || 'Profession'}
        </p>
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.55)', lineHeight: 2 }}>
          {resume.personalInfo?.email && <div>{resume.personalInfo.email}</div>}
          {resume.personalInfo?.phone && <div>{resume.personalInfo.phone}</div>}
          {resume.personalInfo?.location && <div>{resume.personalInfo.location}</div>}
        </div>
        {resume.skills?.length > 0 && (
          <div style={{ marginTop: 24 }}>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: c, marginBottom: 8 }}>Skills</div>
            {resume.skills.filter(s => s.trim()).map((s, i) => (
              <div key={i} style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)', marginBottom: 4, paddingLeft: 8, borderLeft: `2px solid ${c}55` }}>{s.trim()}</div>
            ))}
          </div>
        )}
      </div>
      <div style={{ padding: '28px 28px', background: '#fff' }}>
        {resume.summary && (
          <div style={{ marginBottom: 20, padding: '12px 16px', background: `${c}11`, borderRadius: 8, borderLeft: `3px solid ${c}` }}>
            <p style={{ margin: 0, fontSize: 12, color: '#555', lineHeight: 1.7 }}>{resume.summary}</p>
          </div>
        )}
        <CreativeSection title="Experience" accent={c}>
          {resume.experience?.map((e, i) => e.role && (
            <div key={i} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong style={{ fontSize: 12 }}>{e.role}</strong>
                <span style={{ fontSize: 10, color: '#aaa' }}>{e.duration}</span>
              </div>
              <div style={{ fontSize: 11, color: '#888', marginBottom: 4 }}>{e.company}</div>
              <p style={{ fontSize: 11, color: '#666', margin: 0, lineHeight: 1.5 }}>{e.description}</p>
            </div>
          ))}
        </CreativeSection>
        <CreativeSection title="Education" accent={c}>
          {resume.education?.map((ed, i) => ed.degree && (
            <div key={i} style={{ marginBottom: 10 }}>
              <strong style={{ fontSize: 12 }}>{ed.degree}</strong>
              <div style={{ fontSize: 11, color: '#888' }}>{ed.college} {ed.year && `· ${ed.year}`}</div>
            </div>
          ))}
        </CreativeSection>
        <CreativeSection title="Projects" accent={c}>
          {resume.projects?.map((p, i) => p.title && (
            <div key={i} style={{ marginBottom: 10 }}>
              <strong style={{ fontSize: 12 }}>{p.title}</strong>
              <p style={{ fontSize: 11, color: '#666', margin: '2px 0 0', lineHeight: 1.5 }}>{p.description}</p>
            </div>
          ))}
        </CreativeSection>
      </div>
    </div>
  );
};

// small preview helpers
const PreviewSection = ({ title, children, accent, modern }) => (
  <div style={{ marginBottom: 20 }}>
    <div style={{
      fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
      color: modern ? accent : '#888', marginBottom: 10,
      paddingBottom: 4, borderBottom: `1px solid ${modern ? accent + '33' : '#e5e5e5'}`,
    }}>{title}</div>
    {children}
  </div>
);
const MinimalSection = ({ title, children, accent }) => (
  <div style={{ marginBottom: 24 }}>
    <div style={{ fontSize: 10, color: accent, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>{title}</div>
    {children}
  </div>
);
const CreativeSection = ({ title, children, accent }) => (
  <div style={{ marginBottom: 18 }}>
    <div style={{
      fontSize: 9, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase',
      color: accent, marginBottom: 10,
      display: 'flex', alignItems: 'center', gap: 6,
    }}>
      {title}
      <span style={{ flex: 1, height: 1, background: `${accent}33` }} />
    </div>
    {children}
  </div>
);

// ========== FORM PANELS ==========

const PersonalPanel = ({ resume, setResume }) => (
  <div>
    <Field label="Full Name" placeholder="Jane Doe" value={resume.personalInfo?.fullName || ''} onChange={e => setResume(r => ({ ...r, personalInfo: { ...r.personalInfo, fullName: e.target.value } }))} />
    <Field label="Profession" placeholder="Senior Software Engineer" value={resume.personalInfo?.profession || ''} onChange={e => setResume(r => ({ ...r, personalInfo: { ...r.personalInfo, profession: e.target.value } }))} />
    <Field label="Email" type="email" placeholder="jane@example.com" value={resume.personalInfo?.email || ''} onChange={e => setResume(r => ({ ...r, personalInfo: { ...r.personalInfo, email: e.target.value } }))} />
    <Field label="Phone" placeholder="+1 (555) 000-0000" value={resume.personalInfo?.phone || ''} onChange={e => setResume(r => ({ ...r, personalInfo: { ...r.personalInfo, phone: e.target.value } }))} />
    <Field label="Location" placeholder="San Francisco, CA" value={resume.personalInfo?.location || ''} onChange={e => setResume(r => ({ ...r, personalInfo: { ...r.personalInfo, location: e.target.value } }))} />
  </div>
);

const SummaryPanel = ({ resume, setResume }) => (
  <div>
    <Field label="Professional Summary" placeholder="A brief, compelling summary of who you are and what you bring..." rows={7} value={resume.summary || ''} onChange={e => setResume(r => ({ ...r, summary: e.target.value }))} />
    <p style={{ fontSize: 11, color: '#6b7280', marginTop: 6 }}>
      Tip: 2–4 sentences. Focus on your biggest strengths and what you're looking for.
    </p>
  </div>
);

const EducationPanel = ({ resume, setResume }) => {
  const update = (i, key, val) => setResume(r => {
    const arr = [...r.education];
    arr[i] = { ...arr[i], [key]: val };
    return { ...r, education: arr };
  });
  const add = () => setResume(r => ({ ...r, education: [...r.education, { college: '', degree: '', year: '' }] }));
  const remove = i => setResume(r => ({ ...r, education: r.education.filter((_, idx) => idx !== i) }));
  return (
    <div>
      {resume.education?.map((ed, i) => (
        <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: 16, marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontSize: 12, color: '#9BFF4F', fontWeight: 600 }}>Education {i + 1}</span>
            {i > 0 && <button onClick={() => remove(i)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: 2 }}><TrashIcon size={14} /></button>}
          </div>
          <Field placeholder="B.S. Computer Science" value={ed.degree} onChange={e => update(i, 'degree', e.target.value)} />
          <Field placeholder="University / College Name" value={ed.college} onChange={e => update(i, 'college', e.target.value)} />
          <Field placeholder="2020 – 2024" value={ed.year} onChange={e => update(i, 'year', e.target.value)} />
        </div>
      ))}
      <button onClick={add} style={{
        display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px',
        background: 'rgba(155,255,79,0.08)', border: '1px dashed rgba(155,255,79,0.3)',
        borderRadius: 8, color: '#9BFF4F', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit',
      }}>
        <PlusIcon size={13} /> Add Education
      </button>
    </div>
  );
};

const ExperiencePanel = ({ resume, setResume }) => {
  const update = (i, key, val) => setResume(r => {
    const arr = [...r.experience];
    arr[i] = { ...arr[i], [key]: val };
    return { ...r, experience: arr };
  });
  const add = () => setResume(r => ({ ...r, experience: [...r.experience, { company: '', role: '', duration: '', description: '' }] }));
  const remove = i => setResume(r => ({ ...r, experience: r.experience.filter((_, idx) => idx !== i) }));
  return (
    <div>
      {resume.experience?.map((exp, i) => (
        <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: 16, marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontSize: 12, color: '#9BFF4F', fontWeight: 600 }}>Experience {i + 1}</span>
            {i > 0 && <button onClick={() => remove(i)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: 2 }}><TrashIcon size={14} /></button>}
          </div>
          <Field placeholder="Role / Job Title" value={exp.role} onChange={e => update(i, 'role', e.target.value)} />
          <Field placeholder="Company Name" value={exp.company} onChange={e => update(i, 'company', e.target.value)} />
          <Field placeholder="Jan 2022 – Present" value={exp.duration} onChange={e => update(i, 'duration', e.target.value)} />
          <Field placeholder="Describe your responsibilities and impact..." rows={4} value={exp.description} onChange={e => update(i, 'description', e.target.value)} />
        </div>
      ))}
      <button onClick={add} style={{
        display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px',
        background: 'rgba(155,255,79,0.08)', border: '1px dashed rgba(155,255,79,0.3)',
        borderRadius: 8, color: '#9BFF4F', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit',
      }}>
        <PlusIcon size={13} /> Add Experience
      </button>
    </div>
  );
};

const ProjectsPanel = ({ resume, setResume }) => {
  const update = (i, key, val) => setResume(r => {
    const arr = [...r.projects];
    arr[i] = { ...arr[i], [key]: val };
    return { ...r, projects: arr };
  });
  const add = () => setResume(r => ({ ...r, projects: [...r.projects, { title: '', description: '', link: '' }] }));
  const remove = i => setResume(r => ({ ...r, projects: r.projects.filter((_, idx) => idx !== i) }));
  return (
    <div>
      {resume.projects?.map((proj, i) => (
        <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: 16, marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontSize: 12, color: '#9BFF4F', fontWeight: 600 }}>Project {i + 1}</span>
            {i > 0 && <button onClick={() => remove(i)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: 2 }}><TrashIcon size={14} /></button>}
          </div>
          <Field placeholder="Project Name" value={proj.title} onChange={e => update(i, 'title', e.target.value)} />
          <Field placeholder="https://github.com/..." value={proj.link} onChange={e => update(i, 'link', e.target.value)} />
          <Field placeholder="What did you build and why? What was the impact?" rows={3} value={proj.description} onChange={e => update(i, 'description', e.target.value)} />
        </div>
      ))}
      <button onClick={add} style={{
        display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px',
        background: 'rgba(155,255,79,0.08)', border: '1px dashed rgba(155,255,79,0.3)',
        borderRadius: 8, color: '#9BFF4F', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit',
      }}>
        <PlusIcon size={13} /> Add Project
      </button>
    </div>
  );
};

const SkillsPanel = ({ resume, setResume }) => (
  <div>
    <Field
      label="Skills (comma-separated)"
      placeholder="React, TypeScript, Node.js, PostgreSQL, Docker..."
      rows={4}
      value={resume.skills?.join(', ') || ''}
      onChange={e => setResume(r => ({ ...r, skills: e.target.value.split(',').map(s => s) }))}
    />
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
      {resume.skills?.map((s, i) => s.trim() && (
        <span key={i} style={{
          padding: '3px 10px', borderRadius: 20, fontSize: 11,
          background: 'rgba(155,255,79,0.1)', border: '1px solid rgba(155,255,79,0.3)', color: '#9BFF4F',
        }}>{s.trim()}</span>
      ))}
    </div>
  </div>
);

// ========== MAIN COMPONENT ==========

const ResumeBuilder = () => {
  const { resumeId } = useParams?.() || {};
  const {token} = useSelector(state=>state.auth)
  const [resume, setResume] = useState(empty);
  const [activeSection, setActiveSection] = useState('personal');
  const [saving, setSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    document.title = `Resume Builder${resume.title ? ` · ${resume.title}` : ''}`;
  }, [resume.title]);

  const progressPct = Math.round(
    ((sectionDefs.findIndex(s => s.id === activeSection) + 1) / sectionDefs.length) * 100
  );

  const renderForm = () => {
    switch (activeSection) {
      case 'personal':   return <PersonalPanel   resume={resume} setResume={setResume} />;
      case 'summary':    return <SummaryPanel    resume={resume} setResume={setResume} />;
      case 'education':  return <EducationPanel  resume={resume} setResume={setResume} />;
      case 'experience': return <ExperiencePanel resume={resume} setResume={setResume} />;
      case 'projects':   return <ProjectsPanel   resume={resume} setResume={setResume} />;
      case 'skills':     return <SkillsPanel     resume={resume} setResume={setResume} />;
      default: return null;
    }
  };

  const renderPreview = () => {
    switch (resume.template) {
      case 'modern':   return <ModernPreview   resume={resume} />;
      case 'minimal':  return <MinimalPreview  resume={resume} />;
      case 'creative': return <CreativePreview resume={resume} />;
      default:         return <ClassicPreview  resume={resume} />;
    }
  };

  const c = resume.accent_color;

  return (
    <div style={{
      minHeight: '100vh',
      background: '#060a12',
      backgroundImage: 'radial-gradient(ellipse at 20% 20%, rgba(155,255,79,0.04) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(155,255,79,0.02) 0%, transparent 60%)',
      color: '#e5e7eb',
      fontFamily: '"Inter", "SF Pro Display", sans-serif',
      padding: '20px 24px 40px',
      boxSizing: 'border-box',
    }}>
      {/* TOP BAR */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <a href="/app" style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#9BFF4F', textDecoration: 'none', fontSize: 13, fontWeight: 500 }}>
          <ArrowLeftIcon size={15} />
          Dashboard
        </a>

        <input
          value={resume.title}
          onChange={e => setResume(r => ({ ...r, title: e.target.value }))}
          style={{
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 8, padding: '6px 14px', color: '#e5e7eb', fontSize: 14,
            outline: 'none', textAlign: 'center', fontFamily: 'inherit', minWidth: 200,
          }}
          placeholder="Resume Title"
        />

        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={() => setPreviewMode(p => !p)}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '7px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer',
              background: previewMode ? 'rgba(155,255,79,0.15)' : 'rgba(255,255,255,0.06)',
              border: `1px solid ${previewMode ? 'rgba(155,255,79,0.4)' : 'rgba(255,255,255,0.1)'}`,
              color: previewMode ? '#9BFF4F' : '#9ca3af',
              fontFamily: 'inherit',
            }}
          >
            <EyeIcon size={13} /> Preview
          </button>
          <button
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '7px 16px', borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer',
              background: '#9BFF4F', border: 'none', color: '#050a04', fontFamily: 'inherit',
            }}
          >
            <DownloadIcon size={13} /> Export PDF
          </button>
        </div>
      </div>

      {/* MAIN GRID */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: previewMode ? '1fr' : '380px 1fr',
        gap: 20,
        alignItems: 'start',
      }}>
        {/* -------- LEFT PANEL -------- */}
        {!previewMode && (
          <div style={{
            background: '#0b1020',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 18,
            overflow: 'hidden',
            position: 'sticky',
            top: 20,
            maxHeight: 'calc(100vh - 100px)',
            display: 'flex',
            flexDirection: 'column',
          }}>
            {/* Progress bar */}
            <div style={{ height: 3, background: 'rgba(255,255,255,0.06)' }}>
              <div style={{ height: '100%', background: c, width: `${progressPct}%`, transition: 'width 0.4s ease', borderRadius: 2 }} />
            </div>

            <div style={{ padding: '20px 20px 0', overflowY: 'auto', flex: 1 }}>
              {/* Section nav pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 24 }}>
                {sectionDefs.map(sec => {
                  const Icon = sec.icon;
                  const isActive = activeSection === sec.id;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => setActiveSection(sec.id)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 5,
                        padding: '5px 11px', borderRadius: 20, fontSize: 12, fontWeight: 500,
                        cursor: 'pointer', transition: 'all 0.15s', border: 'none', fontFamily: 'inherit',
                        background: isActive ? c : 'rgba(255,255,255,0.07)',
                        color: isActive ? '#050a04' : '#9ca3af',
                      }}
                    >
                      <Icon size={12} />
                      {sec.label}
                    </button>
                  );
                })}
              </div>

              {/* Active section form */}
              <div style={{ marginBottom: 24 }}>
                <SectionTitle>{sectionDefs.find(s => s.id === activeSection)?.label}</SectionTitle>
                {renderForm()}
              </div>

              {/* Templates */}
              <div style={{ marginBottom: 24 }}>
                <SectionTitle>Template</SectionTitle>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {templates.map(t => {
                    const sel = resume.template === t.id;
                    return (
                      <div
                        key={t.id}
                        onClick={() => setResume(r => ({ ...r, template: t.id }))}
                        style={{
                          padding: '12px 14px', borderRadius: 10, cursor: 'pointer', transition: 'all 0.15s',
                          border: sel ? `1.5px solid ${c}` : '1px solid rgba(255,255,255,0.07)',
                          background: sel ? `${c}0f` : 'rgba(255,255,255,0.03)',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 3 }}>
                          <span style={{ fontSize: 13, fontWeight: 600, color: sel ? c : '#e5e7eb' }}>{t.name}</span>
                          {sel && <CheckIcon size={12} color={c} />}
                        </div>
                        <p style={{ fontSize: 10, color: '#6b7280', margin: 0 }}>{t.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Accent colors */}
              <div style={{ marginBottom: 28 }}>
                <SectionTitle>Accent Color</SectionTitle>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  {accentColors.map(col => (
                    <button
                      key={col}
                      onClick={() => setResume(r => ({ ...r, accent_color: col }))}
                      style={{
                        width: 30, height: 30, borderRadius: '50%', background: col,
                        border: resume.accent_color === col ? `3px solid #fff` : '3px solid transparent',
                        cursor: 'pointer', transition: 'transform 0.15s',
                        transform: resume.accent_color === col ? 'scale(1.2)' : 'scale(1)',
                        boxSizing: 'border-box',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* -------- RIGHT PANEL (preview) -------- */}
        <div style={{
          background: '#fff',
          borderRadius: 18,
          overflow: 'hidden',
          minHeight: previewMode ? 'auto' : 'calc(100vh - 100px)',
          boxShadow: '0 0 0 1px rgba(255,255,255,0.05)',
        }}>
          {renderPreview()}
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
 