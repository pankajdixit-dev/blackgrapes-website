import mongoose from 'mongoose';

const siteSettingsSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      default: 'Black Grapes Softech'
    },
    brandTagline: {
      type: String,
      default: 'Innovate. Integrate. Elevate.'
    },
    primaryPhone: {
      type: String,
      default: '+917470997884'
    },
    secondaryPhone: {
      type: String,
      default: '+916262414463'
    },
    primaryEmail: {
      type: String,
      default: 'contact@blackgrapessoftech.com'
    },
    supportEmail: {
      type: String,
      default: 'info@blackgrapessoftech.com'
    },
    headquartersAddress: {
      type: String,
      default: 'Indore, Madhya Pradesh, India'
    },
    googleMapsUrl: {
      type: String,
      default: 'https://maps.google.com/?q=Indore'
    },
    socialLinks: {
      linkedin: { type: String, default: 'https://www.linkedin.com/company/black-grapes-softech' },
      twitter: { type: String, default: 'https://twitter.com/blackgrapes' },
      instagram: { type: String, default: 'https://www.instagram.com/blackgrapessoftech' },
      facebook: { type: String, default: 'https://www.facebook.com/blackgrapessoftech' },
      youtube: { type: String, default: 'https://youtube.com' },
      github: { type: String, default: 'https://github.com/pankajdixit-dev' }
    },
    seoTitle: {
      type: String,
      default: 'Black Grapes Softech - Custom Software & Enterprise Solutions'
    },
    seoDescription: {
      type: String,
      default: 'Enterprise custom software engineering, Android/iOS apps, CRMs, and web platforms built with precision.'
    },
    seoKeywords: {
      type: [String],
      default: ['software development', 'IT solutions', 'mobile apps', 'Indore', 'enterprise software']
    },
    headerNoticeText: {
      type: String,
      default: '10+ Years of Proven IT Excellence • Indore, India'
    },
    footerCopyright: {
      type: String,
      default: '© 2026 Black Grapes Softech. All rights reserved.'
    },
    lastUpdatedBy: {
      type: String,
      default: 'System'
    }
  },
  {
    timestamps: true
  }
);

const SiteSettings = mongoose.model('SiteSettings', siteSettingsSchema);
export default SiteSettings;
