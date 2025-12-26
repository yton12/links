import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';

import { resumeData } from '@/lib/resume-data';

// Color palette matching the web design
const colors = {
  black: '#0a0a0a',
  darkGray: '#18181b',
  gray: '#3f3f46',
  mediumGray: '#52525b',
  lightGray: '#a1a1aa',
  lighterGray: '#e4e4e7',
  white: '#fafafa',
  accent: '#06b6d4', // cyan
  accentMuted: '#0e7490',
};

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 10,
    paddingTop: 30,
    paddingBottom: 30,
    paddingHorizontal: 35,
    backgroundColor: colors.white,
    color: colors.darkGray,
  },
  // Header
  header: {
    marginBottom: 12,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: colors.black,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  name: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 24,
    color: colors.black,
    letterSpacing: 0.5,
  },
  contactRight: {
    textAlign: 'right',
    alignItems: 'flex-end',
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 2,
  },
  contactText: {
    fontSize: 8.5,
    color: colors.gray,
  },
  contactLink: {
    fontSize: 8.5,
    color: colors.accentMuted,
    textDecoration: 'none',
  },
  contactSeparator: {
    fontSize: 8.5,
    color: colors.lightGray,
    marginHorizontal: 5,
  },
  role: {
    fontSize: 11,
    color: colors.mediumGray,
    marginTop: 1,
  },
  // Summary
  summary: {
    fontSize: 9.5,
    lineHeight: 1.5,
    color: colors.gray,
    marginBottom: 14,
  },
  // Section
  section: {
    marginBottom: 12,
  },
  sectionHeader: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 9,
    color: colors.accent,
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 6,
    paddingBottom: 3,
    borderBottomWidth: 1,
    borderBottomColor: colors.lighterGray,
  },
  // Skills grid
  skillsContainer: {
    backgroundColor: '#f8fafc',
    padding: 8,
    borderRadius: 3,
  },
  skillRow: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  skillRowLast: {
    flexDirection: 'row',
    marginBottom: 0,
  },
  skillCategory: {
    fontFamily: 'Helvetica-Bold',
    width: 75,
    fontSize: 9,
    color: colors.black,
  },
  skillValue: {
    flex: 1,
    fontSize: 9,
    color: colors.gray,
  },
  // Projects
  projectItem: {
    marginBottom: 10,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  projectTitle: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 11,
    color: colors.black,
  },
  techBadge: {
    fontFamily: 'Courier',
    fontSize: 7.5,
    color: colors.mediumGray,
    backgroundColor: colors.lighterGray,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 2,
  },
  projectDescription: {
    fontFamily: 'Helvetica-Oblique',
    fontSize: 9,
    color: colors.mediumGray,
    marginBottom: 2,
  },
  bulletList: {
    paddingLeft: 2,
  },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: 1,
  },
  bullet: {
    width: 12,
    fontSize: 9,
    color: colors.accent,
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    color: colors.gray,
    lineHeight: 1.35,
  },
  // Experience
  expItem: {
    marginBottom: 10,
  },
  expHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  expLeft: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  expCompany: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 11,
    color: colors.black,
  },
  expSeparator: {
    fontSize: 9,
    color: colors.lightGray,
    marginHorizontal: 6,
  },
  expRole: {
    fontSize: 9.5,
    color: colors.mediumGray,
  },
  expPeriod: {
    fontFamily: 'Courier',
    fontSize: 8,
    color: colors.mediumGray,
  },
  // Education
  eduContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: '#f8fafc',
    padding: 8,
    borderRadius: 3,
  },
  eduLeft: {},
  eduInstitution: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 11,
    color: colors.black,
    marginBottom: 1,
  },
  eduDegree: {
    fontSize: 9.5,
    color: colors.gray,
  },
  eduRight: {
    alignItems: 'flex-end',
  },
  eduDate: {
    fontFamily: 'Courier',
    fontSize: 8,
    color: colors.mediumGray,
    marginBottom: 1,
  },
  eduGpa: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 8.5,
    color: colors.accent,
  },
});

export function ResumePDF(): React.ReactElement {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.name}>{resumeData.name}</Text>
              <Text style={styles.role}>{resumeData.role}</Text>
            </View>
            <View style={styles.contactRight}>
              <View style={styles.contactRow}>
                <Link src={`mailto:${resumeData.contact.email}`} style={styles.contactLink}>
                  {resumeData.contact.email}
                </Link>
                <Text style={styles.contactSeparator}>•</Text>
                <Text style={styles.contactText}>{resumeData.contact.phone}</Text>
                <Text style={styles.contactSeparator}>•</Text>
                <Text style={styles.contactText}>{resumeData.contact.location}</Text>
              </View>
              <View style={styles.contactRow}>
                <Link src={`https://${resumeData.contact.website}`} style={styles.contactLink}>
                  {resumeData.contact.website}
                </Link>
                <Text style={styles.contactSeparator}>•</Text>
                <Link src={`https://${resumeData.contact.github}`} style={styles.contactLink}>
                  GitHub
                </Link>
                <Text style={styles.contactSeparator}>•</Text>
                <Link src={`https://${resumeData.contact.linkedin}`} style={styles.contactLink}>
                  LinkedIn
                </Link>
              </View>
            </View>
          </View>
        </View>

        {/* Summary */}
        <Text style={styles.summary}>{resumeData.summary}</Text>

        {/* Technical Skills */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Technical Skills</Text>
          <View style={styles.skillsContainer}>
            {resumeData.skills.map((skill, index) => (
              <View
                key={skill.category}
                style={
                  index === resumeData.skills.length - 1 ? styles.skillRowLast : styles.skillRow
                }
              >
                <Text style={styles.skillCategory}>{skill.category}</Text>
                <Text style={styles.skillValue}>{skill.skills}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Featured Projects */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Featured Projects</Text>
          {resumeData.projects
            .filter((project) => project.title !== 'SweetHearty')
            .map((project) => (
              <View key={project.title} style={styles.projectItem}>
                <View style={styles.projectHeader}>
                  <Text style={styles.projectTitle}>{project.title}</Text>
                  <Text style={styles.techBadge}>{project.techStack}</Text>
                </View>
                <Text style={styles.projectDescription}>{project.description}</Text>
                <View style={styles.bulletList}>
                  {project.bullets.map((bullet, i) => (
                    <View key={i} style={styles.bulletItem}>
                      <Text style={styles.bullet}>›</Text>
                      <Text style={styles.bulletText}>{bullet}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
        </View>

        {/* Professional Experience */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Experience</Text>
          {resumeData.experience.map((exp) => (
            <View key={exp.company} style={styles.expItem}>
              <View style={styles.expHeader}>
                <View style={styles.expLeft}>
                  <Text style={styles.expCompany}>{exp.company}</Text>
                  <Text style={styles.expSeparator}>|</Text>
                  <Text style={styles.expRole}>{exp.role}</Text>
                </View>
                <Text style={styles.expPeriod}>{exp.period}</Text>
              </View>
              <View style={styles.bulletList}>
                {exp.bullets.map((bullet, i) => (
                  <View key={i} style={styles.bulletItem}>
                    <Text style={styles.bullet}>›</Text>
                    <Text style={styles.bulletText}>{bullet}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>

        {/* Education */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Education</Text>
          <View style={styles.eduContainer}>
            <View style={styles.eduLeft}>
              <Text style={styles.eduInstitution}>{resumeData.education.institution}</Text>
              <Text style={styles.eduDegree}>{resumeData.education.degree}</Text>
            </View>
            <View style={styles.eduRight}>
              <Text style={styles.eduDate}>{resumeData.education.graduationDate}</Text>
              <Text style={styles.eduGpa}>GPA: {resumeData.education.gpa}</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
