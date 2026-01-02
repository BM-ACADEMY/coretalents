// ResumeDocument.jsx
import React from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Svg,
  Path,
  Link 
} from '@react-pdf/renderer';

// --- HELPER FUNCTION ---
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

// --- PDF STYLES ---
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 11,
    color: '#334155',
    lineHeight: 1.5
  },
  // --- CENTERED HEADER STYLES ---
  header: {
    flexDirection: 'column', // Stack items vertically
    alignItems: 'center',    // Center align items horizontally
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    paddingBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 4,
    color: '#0f172a',
    textAlign: 'center' // Ensure text aligns center
  },
  profession: {
    fontSize: 14,
    marginTop: 2,
    color: '#64748b',
    marginBottom: 8,
    textAlign: 'center'
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
    justifyContent: 'center', // Center the contact items row
    alignItems: 'center'
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8, // Add spacing on both sides for centered layout
    marginBottom: 4
  },
  icon: {
    width: 10,
    height: 10,
    marginRight: 5
  },
  contactText: {
    fontSize: 9,
    color: '#64748b',
    lineHeight: 1.2,
    marginTop: 1
  },
  // --- END HEADER STYLES ---
  
  section: {
    marginBottom: 15,
    marginTop: 5
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 8,
    letterSpacing: 1
  },
  itemBlock: {
    marginBottom: 10
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2
  },
  itemTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1e293b'
  },
  itemDate: {
    fontSize: 9,
    color: '#94a3b8'
  },
  itemSubtitle: {
    fontSize: 10,
    color: '#475569',
    fontStyle: 'italic',
    marginBottom: 3
  },
  description: {
    fontSize: 10,
    color: '#475569',
    textAlign: 'justify'
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6
  },
  skillBadge: {
    fontSize: 10,
    color: '#475569'
  }
});

// --- PDF ICONS ---
const PdfIcon = ({ path }) => (
  <Svg viewBox="0 0 24 24" style={styles.icon}>
    <Path d={path} stroke="#64748b" strokeWidth={2} fill="none" />
  </Svg>
);

const Icons = {
  Mail: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6",
  Phone: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",
  MapPin: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 10a3 3 0 0 1 0 6 3 3 0 0 1 0-6z",
  Linkedin: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 2a2 2 0 1 1-1.99 2A2 2 0 0 1 4 2z",
  Globe: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z M2 12h20 M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
};

// --- MAIN PDF EXPORT ---
const ResumeDocument = ({ data, themeColor }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header - Now simplified and Centered */}
      <View style={styles.header}>
          <Text style={{ ...styles.name, color: themeColor }}>{data.personalInfo.fullName}</Text>
          <Text style={styles.profession}>{data.personalInfo.profession}</Text>
          
          <View style={styles.contactRow}>
            {data.personalInfo.email && (
              <View style={styles.contactItem}>
                <PdfIcon path={Icons.Mail} />
                <Text style={styles.contactText}>{data.personalInfo.email}</Text>
              </View>
            )}
            
            {data.personalInfo.phone && (
              <View style={styles.contactItem}>
                <PdfIcon path={Icons.Phone} />
                <Text style={styles.contactText}>{data.personalInfo.phone}</Text>
              </View>
            )}
            
            {data.personalInfo.location && (
              <View style={styles.contactItem}>
                <PdfIcon path={Icons.MapPin} />
                <Text style={styles.contactText}>{data.personalInfo.location}</Text>
              </View>
            )}
            
            {data.personalInfo.linkedin && (
              <View style={styles.contactItem}>
                <PdfIcon path={Icons.Linkedin} />
                <Link src={data.personalInfo.linkedin} style={{ textDecoration: 'none' }}>
                   <Text style={styles.contactText}>{data.personalInfo.linkedin}</Text>
                </Link>
              </View>
            )}
            
            {data.personalInfo.website && (
              <View style={styles.contactItem}>
                <PdfIcon path={Icons.Globe} />
                <Link src={data.personalInfo.website} style={{ textDecoration: 'none' }}>
                    <Text style={styles.contactText}>{data.personalInfo.website}</Text>
                </Link>
              </View>
            )}
          </View>
          {/* IMAGE REMOVED COMPLETELY */}
      </View>

      {/* Summary */}
      {data.summary && (
        <View style={styles.section}>
          <Text style={{ ...styles.sectionTitle, color: themeColor }}>Professional Summary</Text>
          <Text style={styles.description}>{data.summary}</Text>
        </View>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <View style={styles.section}>
          <Text style={{ ...styles.sectionTitle, color: themeColor }}>Experience</Text>
          {data.experience.map((exp) => (
            <View key={exp.id} style={styles.itemBlock} wrap={false}>
              <View style={styles.rowBetween}>
                <Text style={styles.itemTitle}>{exp.title}</Text>
                <Text style={styles.itemDate}>{formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}</Text>
              </View>
              <Text style={styles.itemSubtitle}>{exp.company}</Text>
              <Text style={styles.description}>{exp.description}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <View style={styles.section}>
          <Text style={{ ...styles.sectionTitle, color: themeColor }}>Projects</Text>
          {data.projects.map((proj) => (
            <View key={proj.id} style={styles.itemBlock} wrap={false}>
              <View style={styles.rowBetween}>
                <Text style={styles.itemTitle}>{proj.name}</Text>
                {proj.type && <Text style={styles.itemDate}>{proj.type}</Text>}
              </View>
              <Text style={styles.description}>{proj.description}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <View style={styles.section}>
          <Text style={{ ...styles.sectionTitle, color: themeColor }}>Education</Text>
          {data.education.map((edu) => (
            <View key={edu.id} style={styles.itemBlock} wrap={false}>
              <View style={styles.rowBetween}>
                <Text style={styles.itemTitle}>{edu.school}</Text>
                <Text style={styles.itemDate}>{formatDate(edu.date)}</Text>
              </View>
              <Text style={styles.description}>{edu.degree} {edu.field && `in ${edu.field}`}</Text>
              {edu.gpa && <Text style={{...styles.description, marginTop: 2}}>GPA: {edu.gpa}</Text>}
            </View>
          ))}
        </View>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <View style={styles.section}>
          <Text style={{ ...styles.sectionTitle, color: themeColor }}>Skills</Text>
          <View style={styles.skillsContainer}>
            {data.skills.map((skill, index) => (
                <Text key={skill.id} style={styles.skillBadge}>• {skill.name}</Text>
            ))}
          </View>
        </View>
      )}
    </Page>
  </Document>
);

export default ResumeDocument;