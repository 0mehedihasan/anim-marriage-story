"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowDown, ArrowUpRight, BookOpen, BriefcaseBusiness, Compass, Feather, MapPin, UserRound } from "lucide-react";
import { biodata } from "@/data/biodata";
import type { SceneId } from "@/types/biodata";

const reveal: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

function SceneHeading({ eyebrow, title, note }: { eyebrow: string; title: string; note?: string }) {
  return (
    <motion.header className="scene-heading" variants={reveal}>
      <p className="eyebrow"><span />{eyebrow}</p>
      <h1>{title}</h1>
      {note && <p className="scene-note">{note}</p>}
      <span className="ornament-line" aria-hidden="true"><i /></span>
    </motion.header>
  );
}

function DataState({ children = "To be shared" }: { children?: string }) {
  return <p className="data-state"><span aria-hidden="true" />{children}</p>;
}

function Fact({ icon: Icon, label, value }: { icon: typeof UserRound; label: string; value: string }) {
  return (
    <div className="fact-item">
      <span className="fact-icon"><Icon size={17} strokeWidth={1.5} aria-hidden="true" /></span>
      <span><small>{label}</small><strong>{value}</strong></span>
    </div>
  );
}

export function SceneContent({ scene }: { scene: Exclude<SceneId, "opening"> }) {
  const { personal, education, professional, family, personalLife, preferences } = biodata;

  return (
    <motion.div
      key={scene}
      className={`scene-content scene-content--${scene}`}
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.11, delayChildren: 0.1 } } }}
    >
      {scene === "introduction" && (
        <>
          <div className="intro-layout">
            <motion.div className="portrait-frame" variants={reveal} aria-label="Portrait placeholder">
              <div className="portrait-arch">
                <div className="portrait-pattern" />
                <span className="portrait-monogram">AB</span>
                <span className="portrait-caption">PORTRAIT TO BE ADDED</span>
              </div>
              <span className="portrait-index">01 <i /> 09</span>
            </motion.div>
            <div className="intro-copy">
              <motion.p className="eyebrow" variants={reveal}><span />Marriage Biodata</motion.p>
              <motion.h1 variants={reveal}>{personal.fullName}</motion.h1>
              <motion.p className="intro-description" variants={reveal}>
                An introduction to the personal and family details shared for Abdullah&apos;s marriage biodata.
              </motion.p>
              <motion.div className="intro-location" variants={reveal}>
                <MapPin size={16} strokeWidth={1.5} aria-hidden="true" />
                {personal.hometown}, {personal.nationality}
              </motion.div>
              <motion.div className="intro-facts" variants={reveal}>
                <div><strong>{personal.age}</strong><span>Years</span></div>
                <div><strong>{personal.height}</strong><span>Height</span></div>
                <div><strong>{personal.bloodGroup}</strong><span>Blood group</span></div>
                <div><strong>{personal.religion}</strong><span>Faith</span></div>
              </motion.div>
              <motion.div className="narration-hint" variants={reveal}>
                <span className="sound-wave" aria-hidden="true"><i /><i /><i /><i /><i /></span>
                <span>A personal story, told one scene at a time</span>
              </motion.div>
            </div>
          </div>
        </>
      )}

      {scene === "about" && (
        <>
          <SceneHeading eyebrow="A closer introduction" title="Beyond the Introduction" note="A few details, shared with care." />
          <div className="about-layout">
            <motion.div className="about-age" variants={reveal}>
              <span className="about-age-number">{personal.age}</span>
              <span className="about-age-caption">years old</span>
              <span className="about-date">Born {personal.dateOfBirth}</span>
            </motion.div>
            <motion.div className="fact-list" variants={reveal}>
              <Fact icon={Compass} label="Hometown" value={personal.hometown} />
              <Fact icon={UserRound} label="Nationality" value={personal.nationality} />
              <Fact icon={Feather} label="Faith" value={personal.religion} />
            </motion.div>
            <motion.div className="quiet-note" variants={reveal}>
              <span className="note-mark">“</span>
              <p>Details about interests, lifestyle and personal qualities are to be shared.</p>
            </motion.div>
          </div>
        </>
      )}

      {scene === "education" && (
        <>
          <SceneHeading eyebrow="Learning & growth" title="His Educational Journey" note="Education details will be added when shared." />
          <motion.div className="empty-journey" variants={reveal}>
            <span className="journey-icon"><BookOpen size={24} strokeWidth={1.35} aria-hidden="true" /></span>
            <div className="journey-track"><i /><i /><i /></div>
            <div className="journey-placeholders"><span>Education</span><span>Qualifications</span><span>Institution</span></div>
            <DataState />
            {[education.highestEducation, education.degree, education.subject, education.institution, education.passingYear, education.result].some(Boolean) && (
              <dl className="detail-list">
                {education.degree && <div><dt>Degree</dt><dd>{education.degree}</dd></div>}
                {education.subject && <div><dt>Subject</dt><dd>{education.subject}</dd></div>}
                {education.institution && <div><dt>Institution</dt><dd>{education.institution}</dd></div>}
                {education.passingYear && <div><dt>Passing year</dt><dd>{education.passingYear}</dd></div>}
                {education.result && <div><dt>Result</dt><dd>{education.result}</dd></div>}
              </dl>
            )}
          </motion.div>
        </>
      )}

      {scene === "career" && (
        <>
          <SceneHeading eyebrow="Work & purpose" title="Building His Career" note="Professional details will be added when shared." />
          <motion.div className="career-stage" variants={reveal}>
            <div className="career-grid" aria-hidden="true" />
            <span className="career-icon"><BriefcaseBusiness size={26} strokeWidth={1.35} /></span>
            <p className="career-label">Professional life</p>
            <h2>{professional.currentOccupation || "To be shared"}</h2>
            {[professional.designation, professional.company, professional.income, professional.workLocation, professional.careerGoals].some(Boolean) ? (
              <dl className="career-details">
                {professional.designation && <div><dt>Designation</dt><dd>{professional.designation}</dd></div>}
                {professional.company && <div><dt>Company</dt><dd>{professional.company}</dd></div>}
                {professional.income && <div><dt>Income</dt><dd>{professional.income}</dd></div>}
                {professional.workLocation && <div><dt>Work location</dt><dd>{professional.workLocation}</dd></div>}
                {professional.careerGoals && <div><dt>Career goals</dt><dd>{professional.careerGoals}</dd></div>}
              </dl>
            ) : <p className="career-subtitle">Role, workplace and aspirations</p>}
          </motion.div>
        </>
      )}

      {scene === "family" && (
        <>
          <SceneHeading eyebrow="The people closest to him" title="The Family Behind Him" note="A family portrait in names and relationships." />
          <motion.div className="family-tree" variants={reveal}>
            <div className="parent-branch">
              <article className="family-member family-member--parent">
                <span className="member-symbol"><UserRound size={20} strokeWidth={1.4} aria-hidden="true" /></span>
                <small>Father</small><h2>{family.father.name}</h2><p>{family.father.occupation}</p>
              </article>
              <span className="branch-line" aria-hidden="true" />
              <article className="family-member family-member--parent">
                <span className="member-symbol"><UserRound size={20} strokeWidth={1.4} aria-hidden="true" /></span>
                <small>Mother</small><h2>{family.mother.name}</h2><p>{family.mother.occupation}</p>
              </article>
            </div>
            <span className="family-stem" aria-hidden="true"><i /></span>
            <div className="siblings-branch">
              <article className="family-member family-member--son">
                <span className="member-symbol"><UserRound size={20} strokeWidth={1.4} aria-hidden="true" /></span>
                <small>Son</small><h2>Abdullah</h2><p>{family.siblingPosition}</p>
              </article>
              {family.sisters > 0 && <article className="family-member family-member--sister">
                <span className="member-symbol"><UserRound size={20} strokeWidth={1.4} aria-hidden="true" /></span>
                <small>{family.sisters === 1 ? "Sister" : "Sisters"}</small><h2>{family.sisters === 1 ? "One sister" : `${family.sisters} sisters`}</h2>
              </article>}
              {family.brothers > 0 && <article className="family-member">
                <span className="member-symbol"><UserRound size={20} strokeWidth={1.4} aria-hidden="true" /></span>
                <small>{family.brothers === 1 ? "Brother" : "Brothers"}</small><h2>{family.brothers === 1 ? "One brother" : `${family.brothers} brothers`}</h2>
              </article>}
            </div>
          </motion.div>
        </>
      )}

      {scene === "personal" && (
        <>
          <SceneHeading eyebrow="A little more about him" title="Beyond the Profession" note="Personal details shared by the family." />
          <div className="personal-layout">
            <motion.div className="personal-feature" variants={reveal}>
              <span className="personal-feature-icon"><Feather size={22} strokeWidth={1.35} aria-hidden="true" /></span>
              <small>Faith</small><h2>{personal.religion}</h2>
              <p>{personalLife.religiousPractice || "Religious practice details are to be shared."}</p>
            </motion.div>
            <motion.div className="personal-details" variants={reveal}>
              <Fact icon={Compass} label="Hometown" value={personal.hometown} />
              <Fact icon={MapPin} label="Permanent address" value={personal.permanentAddress} />
              {personalLife.lifestyle && <Fact icon={Feather} label="Lifestyle" value={personalLife.lifestyle} />}
              {personalLife.hobbies.length > 0 && <div className="tag-group"><small>Hobbies</small><div>{personalLife.hobbies.map((item) => <span key={item}>{item}</span>)}</div></div>}
              {personalLife.qualities.length > 0 && <div className="tag-group"><small>Personal qualities</small><div>{personalLife.qualities.map((item) => <span key={item}>{item}</span>)}</div></div>}
              {personalLife.otherInformation && <p className="personal-other">{personalLife.otherInformation}</p>}
            </motion.div>
          </div>
        </>
      )}

      {scene === "preferences" && (
        <>
          <SceneHeading eyebrow="A thoughtful next chapter" title="Looking Toward the Future" />
          <motion.div className="future-statement" variants={reveal}>
            <span className="future-rule" />
            {preferences.introduction || <p className="future-copy">Partner preferences have not been shared yet.</p>}
            {preferences.expectations.length > 0 && <div className="expectation-list">{preferences.expectations.map((item) => <span key={item}>{item}</span>)}</div>}
            <span className="future-signature">Abdullah Al Hill Baki</span>
          </motion.div>
        </>
      )}

      {scene === "closing" && (
        <motion.div className="closing-scene" variants={reveal}>
          <span className="closing-mark"><ArrowDown size={18} strokeWidth={1.5} aria-hidden="true" /></span>
          <p className="eyebrow"><span />A quiet close</p>
          <h1>Every meaningful journey begins with getting to know one another.</h1>
          <span className="ornament-line" aria-hidden="true"><i /></span>
          <h2>{personal.fullName}</h2>
          <p className="closing-caption">Marriage Biodata</p>
          <a className="closing-print-link" href="/print" target="_blank" rel="noreferrer">
            View complete biodata <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </motion.div>
      )}
    </motion.div>
  );
}