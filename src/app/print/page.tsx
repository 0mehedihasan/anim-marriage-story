"use client";

import Link from "next/link";
import Image from "next/image";
import { biodata } from "@/data/biodata";

function PrintSection({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="print-section"><h2>{title}</h2><dl>{children}</dl></section>;
}

function PrintRow({ label, value }: { label: string; value: string | number }) {
  if (!value) return null;
  return <div className="print-row"><dt>{label}</dt><dd>{value}</dd></div>;
}

export default function PrintPage() {
  const { personal, education, professional, family, personalLife, preferences } = biodata;
  const showEducation = Object.values(education).some(Boolean);
  const showProfessional = Object.values(professional).some(Boolean);
  const showPersonal = Boolean(personalLife.religiousPractice || personalLife.lifestyle || personalLife.hobbies.length || personalLife.qualities.length || personalLife.otherInformation);

  return (
    <main className="print-page">
      <div className="print-toolbar"><Link href="/">← Return to the story</Link><button onClick={() => window.print()}>Print / Save PDF</button></div>
      <article className="print-document">
        <header className="print-header">
          <Image className="print-profile-photo" src="/anim-profile.jpeg" alt={`Portrait of ${personal.fullName}`} width={100} height={150} />
          <div>
            <p>Marriage Biodata</p>
            <h1>{personal.fullName}</h1>
            <span className="print-rule" />
          </div>
        </header>
        <PrintSection title="Personal Information">
          <PrintRow label="Nickname" value={personal.nickname} />
          <PrintRow label="Date of birth" value={personal.dateOfBirth} />
          <PrintRow label="Age" value={`${personal.age} years`} />
          <PrintRow label="Height" value={personal.height} />
          <PrintRow label="Weight" value={personal.weight} />
          <PrintRow label="Blood group" value={personal.bloodGroup} />
          <PrintRow label="Religion" value={personal.religion} />
          <PrintRow label="Nationality" value={personal.nationality} />
          <PrintRow label="Hometown" value={personal.hometown} />
          <PrintRow label="Permanent address" value={personal.permanentAddress} />
        </PrintSection>
        {showEducation && <PrintSection title="Educational Background">
          <PrintRow label="Highest education" value={education.highestEducation} />
          <PrintRow label="Degree" value={education.degree} />
          <PrintRow label="Subject" value={education.subject} />
          <PrintRow label="Institution" value={education.institution} />
          <PrintRow label="Passing year" value={education.passingYear} />
          <PrintRow label="Result" value={education.result} />
          {education.previousQualifications.map((qualification) => (
            <PrintRow
              key={qualification.qualification}
              label={qualification.qualification}
              value={`${qualification.institution} · ${qualification.result} · ${qualification.passingYear}`}
            />
          ))}
          <PrintRow label="Publication" value={education.publication.title} />
          <PrintRow label="Publication status" value={`${education.publication.status} · ${education.publication.date}`} />
          {education.skills.map((group) => (
            <PrintRow key={group.category} label={group.category} value={group.items.join(", ")} />
          ))}
        </PrintSection>}
        {showProfessional && <PrintSection title="Professional Information">
          <PrintRow label="Occupation" value={professional.currentOccupation} />
          <PrintRow label="Designation" value={professional.designation} />
          <PrintRow label="Company" value={professional.company} />
          <PrintRow label="Work location" value={professional.workLocation} />
          <PrintRow label="Career goals" value={professional.careerGoals} />
        </PrintSection>}
        <PrintSection title="Family Background">
          <PrintRow label="Father" value={`${family.father.name} · ${family.father.occupation}`} />
          <PrintRow label="Mother" value={`${family.mother.name} · ${family.mother.occupation}`} />
          <PrintRow label="Brothers" value={family.brothers} />
          <PrintRow label="Sisters" value={family.sisters} />
          {family.sisters === 1 && <PrintRow label="Older sister" value={`${family.olderSister.name} · ${family.olderSister.maritalStatus} · ${family.olderSister.children} child`} />}
          {family.sisters === 1 && <PrintRow label="Brother-in-law" value={`${family.olderSister.spouseOccupation} · ${family.olderSister.spouseLocation}`} />}
          <PrintRow label="Sibling position" value={family.siblingPosition} />
          <PrintRow label="Family residence" value={family.familyResidence} />
        </PrintSection>
        {showPersonal && <PrintSection title="Religious & Personal Details">
          <PrintRow label="Religious practice" value={personalLife.religiousPractice} />
          <PrintRow label="Lifestyle" value={personalLife.lifestyle} />
          <PrintRow label="Hobbies" value={personalLife.hobbies.join(", ")} />
          <PrintRow label="Personal qualities" value={personalLife.qualities.join(", ")} />
          <PrintRow label="Other information" value={personalLife.otherInformation} />
        </PrintSection>}
        {(preferences.introduction || preferences.partnerPortrait || preferences.expectations.length > 0) && <PrintSection title="Partner Preferences">
          <PrintRow label="Introduction" value={preferences.introduction} />
          <PrintRow label="What I notice about her" value={preferences.partnerPortrait} />
          <PrintRow label="Expectations" value={preferences.expectations.join(", ")} />
        </PrintSection>}
        <footer className="print-footer">Abdullah Al Hill Baki <span>·</span> Marriage Biodata</footer>
      </article>
    </main>
  );
}