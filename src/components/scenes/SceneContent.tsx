"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { ArrowUpRight, BriefcaseBusiness, Compass, Droplet, Feather, Heart, MapPin, Ruler, Scale, UserRound } from "lucide-react";
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

function Fact({ icon: Icon, label, value }: { icon: typeof UserRound; label: string; value: string }) {
  return (
    <div className="fact-item">
      <span className="fact-icon"><Icon size={17} strokeWidth={1.5} aria-hidden="true" /></span>
      <span><small>{label}</small><strong>{value}</strong></span>
    </div>
  );
}

function ManIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="8.5" r="3.7" />
      <path d="M8.4 7.6c.6-1.9 2-3 3.7-3 1.8 0 3.1 1 3.6 3" />
      <path d="M4.8 20.2c.8-3.7 3.6-5.8 7.2-5.8s6.4 2.1 7.2 5.8" />
    </svg>
  );
}

function WomanIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3.2c-3.2 0-5.4 2.6-5.4 5.9 0 2.3 1 4.1 2.5 5.2-2.4.9-3.9 3-4.3 5.9h14.4c-.4-2.9-1.9-5-4.3-5.9 1.5-1.1 2.5-2.9 2.5-5.2 0-3.3-2.2-5.9-5.4-5.9Z" />
      <circle cx="12" cy="9.4" r="2.5" />
    </svg>
  );
}

function FamilyMember({ kind, className = "", children }: { kind: "man" | "woman"; className?: string; children: React.ReactNode }) {
  return (
    <article className={`family-member ${className}`}>
      <span className="member-symbol">{kind === "man" ? <ManIcon /> : <WomanIcon />}</span>
      {children}
    </article>
  );
}

export function SceneContent({ scene }: { scene: Exclude<SceneId, "opening"> }) {
  const { personal, education, professional, family, personalLife, preferences } = biodata;
  const educationSummary = [
    education.subject?.replace("Computer Science and Engineering", "Computer Science & Engineering"),
    education.institution ? "BUBT" : "",
    education.passingYear,
  ].filter(Boolean).join(" · ");

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
            <motion.div className="portrait-frame" variants={reveal}>
              <div className="portrait-arch">
                <Image
                  src="/anim-profile.jpeg"
                  alt={`Portrait of ${personal.fullName}`}
                  fill
                  priority
                  sizes="(max-width: 620px) 150px, (max-width: 900px) 32vw, 340px"
                  className="portrait-image"
                />
              </div>
            </motion.div>
            <div className="intro-copy">
              <motion.p className="eyebrow" variants={reveal}><span />Marriage Biodata</motion.p>
              <motion.h1 variants={reveal}>{personal.fullName}</motion.h1>
              {personal.nickname && <motion.p className="intro-nickname" variants={reveal}>{personal.nickname} to his family</motion.p>}
              {educationSummary && <motion.p className="intro-education" variants={reveal}>{educationSummary}</motion.p>}
              <motion.p className="intro-description" variants={reveal}>
                {personal.nickname} was born on {personal.dateOfBirth} and grew up in {personal.hometown}, the younger child of {family.father.name} and {family.mother.name}. Today he is {personal.age}, a recent graduate, and ready to start a family of his own.
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
                <span>The pages move on their own. Use the arrows below to go at your own pace.</span>
              </motion.div>
            </div>
          </div>
        </>
      )}

      {scene === "about" && (
        <>
          <SceneHeading eyebrow="First, the basics" title={`About ${personal.nickname}`} note="Before the story goes further, here are the details every family likes to know." />
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
            <motion.div className="fact-list" variants={reveal}>
              <Fact icon={Ruler} label="Height" value={personal.height} />
              {personal.weight && <Fact icon={Scale} label="Weight" value={personal.weight} />}
              <Fact icon={Droplet} label="Blood group" value={personal.bloodGroup} />
            </motion.div>
          </div>
        </>
      )}

      {scene === "education" && (
        <>
          <SceneHeading eyebrow="Studies and research" title="His Education" note={`${personal.nickname} studied Computer Science and Engineering at BUBT. Here are his qualifications, research, and technical skills.`} />
          <motion.div className="education-layout" variants={reveal}>
            <section className="education-card education-card--qualifications">
              <p className="education-card-label">University</p>
              <h2>{education.degree} in {education.subject}</h2>
              <p className="education-institution">{education.institution}</p>
              <dl className="education-result">
                <div><dt>Completed</dt><dd>{education.passingYear}</dd></div>
                <div><dt>Result</dt><dd>{education.result}</dd></div>
              </dl>
              <div className="previous-qualifications">
                <h3>Earlier studies</h3>
                {education.previousQualifications.map((qualification) => (
                  <article key={qualification.qualification}>
                    <h4>{qualification.qualification}</h4>
                    <p>{qualification.institution} · {qualification.passingYear}</p>
                    <p>{qualification.result}</p>
                  </article>
                ))}
              </div>
            </section>
            <div className="education-side">
              <section className="education-card">
                <p className="education-card-label">Publication</p>
                <h3 className="publication-title">{education.publication.title}</h3>
                <p className="publication-status">{education.publication.status} · {education.publication.date}</p>
              </section>
              <section className="education-card">
                <p className="education-card-label">Research and software development skills</p>
                <div className="skill-groups">
                  {education.skills.map((group) => (
                    <div className="skill-group" key={group.category}>
                      <h3>{group.category}</h3>
                      <p>{group.items.join(", ")}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </motion.div>
        </>
      )}

      {scene === "career" && (
        <>
          <SceneHeading eyebrow="What he does" title="His Work" />
          <motion.div className="career-stage" variants={reveal}>
            <div className="career-grid" aria-hidden="true" />
            <span className="career-icon"><BriefcaseBusiness size={26} strokeWidth={1.35} /></span>
            <p className="career-label">Professional life</p>
            <h2>{professional.currentOccupation || "Details coming soon"}</h2>
            {[professional.designation, professional.company, professional.income, professional.workLocation, professional.careerGoals].some(Boolean) ? (
              <dl className="career-details">
                {professional.designation && <div><dt>Designation</dt><dd>{professional.designation}</dd></div>}
                {professional.company && <div><dt>Company</dt><dd>{professional.company}</dd></div>}
                {professional.income && <div><dt>Income</dt><dd>{professional.income}</dd></div>}
                {professional.workLocation && <div><dt>Work location</dt><dd>{professional.workLocation}</dd></div>}
                {professional.careerGoals && <div><dt>Career goals</dt><dd>{professional.careerGoals}</dd></div>}
              </dl>
            ) : <p className="career-subtitle">Will be updated soon.</p>}
          </motion.div>
        </>
      )}

      {scene === "family" && (
        <>
          <SceneHeading eyebrow="The people who raised him" title="His Family" note={`Through every year of study, his family stood behind him. This is the home ${personal.nickname} comes from.`} />
          <motion.div className="family-tree" variants={reveal}>
            <div className="parent-branch">
              <FamilyMember kind="man" className="family-member--parent">
                <small>Father</small><h2>{family.father.name}</h2><p>{family.father.occupation}</p>
              </FamilyMember>
              <FamilyMember kind="woman" className="family-member--parent">
                <small>Mother</small><h2>{family.mother.name}</h2><p>{family.mother.occupation}</p>
              </FamilyMember>
            </div>
            <span className="family-stem" aria-hidden="true"><i /></span>
            <div className="siblings-branch" style={{ "--n": 1 + Number(family.sisters > 0) + Number(family.brothers > 0) } as React.CSSProperties}>
              <FamilyMember kind="man" className="family-member--child family-member--son">
                <small>Son</small><h2>{personal.nickname}</h2><p>Younger of two</p>
              </FamilyMember>
              {family.sisters > 0 && <FamilyMember kind="woman" className="family-member--child">
                <small>{family.sisters === 1 ? "Older sister" : "Sisters"}</small><h2>{family.sisters === 1 ? family.olderSister.name : `${family.sisters} sisters`}</h2>
                {family.sisters === 1 && <>
                  <p>{family.olderSister.maritalStatus} · {family.olderSister.children === 1 ? "One child" : `${family.olderSister.children} children`}</p>
                  <p className="family-detail">Husband: {family.olderSister.spouseOccupation.toLowerCase()}, {family.olderSister.spouseLocation}</p>
                </>}
              </FamilyMember>}
              {family.brothers > 0 && <FamilyMember kind="man" className="family-member--child">
                <small>{family.brothers === 1 ? "Brother" : "Brothers"}</small><h2>{family.brothers === 1 ? "One brother" : `${family.brothers} brothers`}</h2>
              </FamilyMember>}
            </div>
          </motion.div>
        </>
      )}

      {scene === "personal" && (
        <>
          <SceneHeading eyebrow="What grounds him" title="Faith and Home" note={`The family is Muslim, and their home is in ${personal.permanentAddress}. It is a home ${personal.nickname} hopes to share one day.`} />
          <div className="personal-layout">
            <motion.div className="personal-feature" variants={reveal}>
              <span className="personal-feature-icon"><Feather size={22} strokeWidth={1.35} aria-hidden="true" /></span>
              <small>Faith</small><h2>{personal.religion}</h2>
              {personalLife.religiousPractice ? <p>{personalLife.religiousPractice}</p> : <p>Raised in a Muslim family in {personal.hometown}</p>}
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
          <SceneHeading eyebrow="In his own words" title="A Note to Her Family" note={`${personal.nickname} wanted to end with a few words of his own, written to her parents.`} />
          <motion.div className="future-statement" variants={reveal}>
            <span className="future-rule" />
            <p className="future-copy">{preferences.introduction || "A few words will be added soon."}</p>
            {preferences.partnerPortrait && <div className="future-portrait">
              <p className="eyebrow"><span />A little about her, as he sees her</p>
              <p>{preferences.partnerPortrait}</p>
            </div>}
            {preferences.expectations.length > 0 && <div className="expectation-list">{preferences.expectations.map((item) => <span key={item}>{item}</span>)}</div>}
            <span className="future-signature">{personal.nickname}</span>
          </motion.div>
        </>
      )}

      {scene === "closing" && (
        <motion.div className="closing-scene" variants={reveal}>
          <span className="closing-mark"><Heart size={18} strokeWidth={1.6} aria-hidden="true" /></span>
          <p className="eyebrow"><span />Jazakallahu khairan</p>
          <h1>Thank you for reading about {personal.nickname}.</h1>
          <p className="closing-note">Every good match begins with two families getting to know each other. If you would like to talk further, or to meet, his family would be very happy to hear from you.</p>
          <span className="ornament-line" aria-hidden="true"><i /></span>
          <h2>{personal.fullName}</h2>
          <p className="closing-caption">Marriage Biodata</p>
          <a className="closing-print-link" href="/print" target="_blank" rel="noreferrer">
            View the full biodata (printable) <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </motion.div>
      )}
    </motion.div>
  );
}