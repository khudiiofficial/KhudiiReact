import nodemailer from 'nodemailer';
import db from '../Database/db.js';
const createTransporter = (senderemail,appPassword) => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: senderemail,
      pass: appPassword
    }
  });
};

export const sendContactInquiryEmail = async (senderemail,appPassword,inquiryData, ownerEmail) => {
  try {
    const transporter = createTransporter(senderemail,appPassword);
    
    const mailOptions = {
      from: senderemail,
      to: ownerEmail,
      subject: `New Contact Inquiry - ${inquiryData.org_id || 'General'}`,
      html: `
           <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <!-- Header with full-width image -->
          <div style="text-align: center; background: #fff;">
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMxms4F6GgLCMoctZ7DW5cVHJEipqKHDa4TQ&s"
              alt="Company Header"
              style="width: 100%; height: auto; display: block; border: none;"
            />
          </div>

          <!-- Body -->
          <div style="padding: 20px; background: #f9f9f9;">
            <h2 style="color: #333;">New Contact Inquiry</h2>
            <p><strong>Name:</strong> ${inquiryData.name}</p>
            <p><strong>Email:</strong> ${inquiryData.email}</p>
            <p><strong>Phone:</strong> +${inquiryData.country_code} ${inquiryData.phone}</p>
            <p><strong>Country:</strong> ${inquiryData.country_name}</p>
            ${inquiryData.org_id ? `<p><strong>Organization Name:</strong> ${inquiryData.org_id}</p>` : ''}
            <p><strong>Message:</strong><br>${inquiryData.message || 'No message provided'}</p>
            <p><strong>Submitted At:</strong> ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Contact inquiry email sent successfully!');
    return true;
  } catch (error) {
    console.error('❌ Error sending email:', error);
    return res.status(500).json({ error });
  }
};


export const sendContactEmail=async(obj)=>{
 const getOwnerQuery = `SELECT * FROM owners`;
   db.query(getOwnerQuery, async (ownerError, ownerResults) => {
    if (ownerError || ownerResults.length === 0) {
      console.error("Error fetching owner:", ownerError);
      // Still save the inquiry even if owner not found
        return res.status(500).json({ error: "Database error" });
    }
    const senderemail=ownerResults[0].sender_email
    const appPassword=ownerResults[0].sender_app_password
    const ownerEmail = ownerResults[0].email;


   try {
  const transporter = createTransporter(senderemail, appPassword);

  const mailOptions = {
    from: senderemail,
    to: ownerEmail,
    subject: `New Contact Form Submission - ${obj.subject || 'General Inquiry'}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <!-- Header with full-width image -->
        <div style="text-align: center; background: #fff;">
          <img 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMxms4F6GgLCMoctZ7DW5cVHJEipqKHDa4TQ&s"
            alt="Company Header"
            style="width: 100%; height: auto; display: block; border: none;"
          />
        </div>

        <!-- Body -->
        <div style="padding: 20px; background: #f9f9f9;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${obj.name}</p>
          <p><strong>Email:</strong> ${obj.email}</p>
          <p><strong>Phone:</strong> ${obj.countryCode ? `+${obj.countryCode} ` : ''}${obj.phone}</p>
          ${obj.CountryName ? `<p><strong>Country:</strong> ${obj.CountryName}</p>` : ''}

          <p><strong>Subject:</strong> ${obj.subject}</p>
          <p><strong>Message:</strong><br>${obj.message || 'No message provided'}</p>
          <p><strong>Submitted At:</strong> ${new Date().toLocaleString()}</p>
        </div>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
  console.log('✅ Contact form email sent successfully!');
  return true;
} catch (error) {
  console.error('❌ Error sending email:', error);
   return res.status(500).json({ error });
}


  }
)

}




export const sendVolunteerEmail = async (obj) => {
  const getOwnerQuery = `SELECT * FROM owners`;
  db.query(getOwnerQuery, async (ownerError, ownerResults) => {
    if (ownerError || ownerResults.length === 0) {
      console.error("Error fetching owner:", ownerError);
      return false;
    }
    
    const senderemail = ownerResults[0].sender_email;
    const appPassword = ownerResults[0].sender_app_password;
    const ownerEmail = ownerResults[0].email;

    try {
      const transporter = createTransporter(senderemail, appPassword);

      const mailOptions = {
        from: senderemail,
        to: ownerEmail,
        subject: `New Volunteer Application - ${obj.name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <!-- Header with full-width image -->
            <div style="text-align: center; background: #fff;">
              <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMxms4F6GgLCMoctZ7DW5cVHJEipqKHDa4TQ&s"
                alt="Company Header"
                style="width: 100%; height: auto; display: block; border: none;"
              />
            </div>

            <!-- Body -->
            <div style="padding: 20px; background: #f9f9f9;">
              <h2 style="color: #333; text-align: center;">New Volunteer Application</h2>
              
              <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <h3 style="color: #2c5aa0; border-bottom: 2px solid #2c5aa0; padding-bottom: 10px;">Volunteer Details</h3>
                
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Name:</strong></td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${obj.name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${obj.email}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${obj.countryCode ? `+${obj.countryCode} ` : ''}${obj.phone}</td>
                  </tr>
                  ${obj.CountryName ? `
                  <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Country:</strong></td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${obj.CountryName}</td>
                  </tr>
                  ` : ''}
                 
                  <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Preferred Contact Time:</strong></td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${obj.contactTime}</td>
                  </tr>
                  ${obj.message ? `
                  <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee; vertical-align: top;"><strong>Message:</strong></td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${obj.message}</td>
                  </tr>
                  ` : ''}
                </table>
                
                <div style="margin-top: 20px; padding: 15px; background: #f0f8ff; border-radius: 5px;">
                  <p style="margin: 0; color: #2c5aa0; font-weight: bold;">
                     Application Submitted: ${new Date().toLocaleString()}
                  </p>
                </div>
              </div>
              
              <div style="text-align: center; margin-top: 20px; color: #666; font-size: 14px;">
                <p>Please contact this volunteer within 24-48 hours.</p>
              </div>
            </div>
          </div>
        `
      };

      await transporter.sendMail(mailOptions);
      console.log('✅ Volunteer application email sent successfully!');
      return true;
    } catch (error) {
      console.error('❌ Error sending volunteer email:', error);
      return false;
    }
  });
};



export const sendJobApplicationEmail = async (obj) => {
  const getOwnerQuery = `SELECT * FROM owners`;
  db.query(getOwnerQuery, async (ownerError, ownerResults) => {
    if (ownerError || ownerResults.length === 0) {
      console.error("Error fetching owner:", ownerError);
      return false;
    }
    
    const senderemail = ownerResults[0].sender_email;
    const appPassword = ownerResults[0].sender_app_password;
    const ownerEmail = ownerResults[0].email;

    try {
      const transporter = createTransporter(senderemail, appPassword);

      const mailOptions = {
        from: senderemail,
        to: ownerEmail,
        subject: `New Job Application - ${obj.interestedPost || 'General Position'}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <!-- Header with full-width image -->
            <div style="text-align: center; background: #fff;">
              <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMxms4F6GgLCMoctZ7DW5cVHJEipqKHDa4TQ&s"
                alt="Company Header"
                style="width: 100%; height: auto; display: block; border: none;"
              />
            </div>

            <!-- Body -->
            <div style="padding: 20px; background: #f9f9f9;">
              <h2 style="color: #333; text-align: center;">New Job Application Received</h2>
              
              <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <h3 style="color: #d4af37; border-bottom: 2px solid #d4af37; padding-bottom: 10px; margin-top: 0;">
                  🎯 Application Details
                </h3>
                
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; width: 35%;"><strong>Applicant Name:</strong></td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${obj.name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${obj.email}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${obj.countryCode ? `+${obj.countryCode} ` : ''}${obj.phone || 'Not provided'}</td>
                  </tr>
                  ${obj.CountryName ? `
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Country:</strong></td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${obj.CountryName}</td>
                  </tr>
                  ` : ''}
                  ${obj.interestedPost ? `
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Interested Position:</strong></td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong style="color: #d4af37;">${obj.interestedPost}</strong></td>
                  </tr>
                  ` : ''}
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Experience:</strong></td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${obj.experience} years</td>
                  </tr>
                  ${obj.qualification ? `
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Qualification:</strong></td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${obj.qualification}</td>
                  </tr>
                  ` : ''}
                </table>

                ${obj.message ? `
                <div style="margin: 20px 0; padding: 15px; background: #fff8e1; border-left: 4px solid #d4af37;">
                  <h4 style="color: #d4af37; margin-top: 0;">Applicant's Message:</h4>
                  <p style="margin: 0; line-height: 1.6;">${obj.message}</p>
                </div>
                ` : ''}
                
                <div style="margin-top: 25px; padding: 15px; background: #f8f9fa; border-radius: 5px; text-align: center;">
                  <p style="margin: 0; color: #495057; font-weight: bold;">
                     Application Submitted: ${new Date().toLocaleString()}
                  </p>
                </div>
              </div>
              
              <div style="text-align: center; margin-top: 20px; color: #666; font-size: 14px;">
                <p>Please review this application and contact the candidate for next steps.</p>
              </div>
            </div>
          </div>
        `
      };

      await transporter.sendMail(mailOptions);
      console.log('✅ Job application email sent successfully!');
      return true;
    } catch (error) {
      console.error('❌ Error sending job application email:', error);
      return false;
    }
  });
};




export const sendStoryEmail = async (obj) => {
  const getOwnerQuery = `SELECT * FROM owners`;
  db.query(getOwnerQuery, async (ownerError, ownerResults) => {
    if (ownerError || ownerResults.length === 0) {
      console.error("Error fetching owner:", ownerError);
      return false;
    }
    
    const senderemail = ownerResults[0].sender_email;
    const appPassword = ownerResults[0].sender_app_password;
    const ownerEmail = ownerResults[0].email;

    try {
      const transporter = createTransporter(senderemail, appPassword);

      const mailOptions = {
        from: senderemail,
        to: ownerEmail,
        subject: `New Story Contribution - ${obj.entityType}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <!-- Header with full-width image -->
            <div style="text-align: center; background: #fff;">
              <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMxms4F6GgLCMoctZ7DW5cVHJEipqKHDa4TQ&s"
                alt="Company Header"
                style="width: 100%; height: auto; display: block; border: none;"
              />
            </div>

            <!-- Body -->
            <div style="padding: 20px; background: #f9f9f9;">
              <h2 style="color: #333; text-align: center;">New Story Contribution</h2>
              
              <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <h3 style="color: #8e44ad; border-bottom: 2px solid #8e44ad; padding-bottom: 10px; margin-top: 0;">
                   Contributor Information
                </h3>
                
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; width: 35%;"><strong>Entity Type:</strong></td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong style="color: #8e44ad;">${obj.entityType}</strong></td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Name:</strong></td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${obj.name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${obj.email}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${obj.countryCode ? `+${obj.countryCode} ` : ''}${obj.phone}</td>
                  </tr>
                  ${obj.CountryName ? `
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Country:</strong></td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${obj.CountryName}</td>
                  </tr>
                  ` : ''}
                  ${obj.company ? `
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Company/Organization:</strong></td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${obj.company}</td>
                  </tr>
                  ` : ''}
                </table>

                <div style="margin: 25px 0; padding: 20px; background: #f4ecf7; border-radius: 8px; border-left: 4px solid #8e44ad;">
                  <h4 style="color: #8e44ad; margin-top: 0; margin-bottom: 15px;">📝 Shared Story:</h4>
                  <div style="background: white; padding: 15px; border-radius: 5px; border: 1px solid #e8daef;">
                    <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${obj.story}</p>
                  </div>
                </div>
                
                <div style="margin-top: 25px; padding: 15px; background: #f8f9fa; border-radius: 5px; text-align: center;">
                  <p style="margin: 0; color: #495057; font-weight: bold;">
                     Story Submitted: ${new Date().toLocaleString()}
                  </p>
                </div>
              </div>
              
          
            </div>
          </div>
        `
      };

      await transporter.sendMail(mailOptions);
      console.log('✅ Story contribution email sent successfully!');
      return true;
    } catch (error) {
      console.error('❌ Error sending story contribution email:', error);
      return false;
    }
  });
};


export const sendDonationEmail = async (obj) => {
  const getOwnerQuery = `SELECT * FROM owners`;
  db.query(getOwnerQuery, async (ownerError, ownerResults) => {
    if (ownerError || ownerResults.length === 0) {
      console.error("Error fetching owner:", ownerError);
      return false;
    }
    
    const senderemail = ownerResults[0].sender_email;
    const appPassword = ownerResults[0].sender_app_password;
    const ownerEmail = ownerResults[0].email;

    try {
      const transporter = createTransporter(senderemail, appPassword);

      const mailOptions = {
        from: senderemail,
        to: ownerEmail,
        subject: `New Donation Request - ${obj.donationType}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <!-- Header with full-width image -->
            <div style="text-align: center; background: #fff;">
              <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMxms4F6GgLCMoctZ7DW5cVHJEipqKHDa4TQ&s"
                alt="Company Header"
                style="width: 100%; height: auto; display: block; border: none;"
              />
            </div>

            <!-- Body -->
            <div style="padding: 20px; background: #f9f9f9;">
              <h2 style="color: #333; text-align: center;">New Donation Request</h2>
              
              <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <!-- Donation Highlight -->
                <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 20px; border: 2px solid #4caf50;">
                  <h3 style="color: #2e7d32; margin: 0; font-size: 24px;">
                    💝 Donation Amount: ${obj.donationAmount}
                  </h3>
                  <p style="color: #388e3c; margin: 5px 0 0 0; font-size: 16px; font-weight: bold;">
                    Type: ${obj.donationType}
                  </p>
                </div>
                
                <h3 style="color: #2e7d32; border-bottom: 2px solid #2e7d32; padding-bottom: 10px; margin-top: 0;">
                  Donor Information
                </h3>
                
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; width: 35%;"><strong>Donor Name:</strong></td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${obj.firstName} ${obj.lastName}</td>
                  </tr>
                  ${obj.email ? `
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${obj.email}</td>
                  </tr>
                  ` : ''}
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${obj.countryCode ? `+${obj.countryCode} ` : ''}${obj.phone}</td>
                  </tr>
                  ${obj.CountryName ? `
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Country:</strong></td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${obj.CountryName}</td>
                  </tr>
                  ` : ''}
                </table>

                <!-- Address Information -->
                <h4 style="color: #2e7d32; margin-bottom: 15px;">📍 Address Details</h4>
                <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
                  <p style="margin: 5px 0;"><strong>Address:</strong> ${obj.address1}</p>
                  <p style="margin: 5px 0;"><strong>City:</strong> ${obj.city}</p>
                  <p style="margin: 5px 0;"><strong>State:</strong> ${obj.state}</p>
                  ${obj.country ? `<p style="margin: 5px 0;"><strong>Country:</strong> ${obj.country}</p>` : ''}
                </div>

                ${obj.message ? `
                <div style="margin: 20px 0; padding: 15px; background: #fff8e1; border-left: 4px solid #ff9800;">
                  <h4 style="color: #f57c00; margin-top: 0;">Donor's Message:</h4>
                  <p style="margin: 0; line-height: 1.6;">${obj.message}</p>
                </div>
                ` : ''}
                
                <div style="margin-top: 25px; padding: 15px; background: #e8f5e8; border-radius: 5px; text-align: center;">
                  <p style="margin: 0; color: #2e7d32; font-weight: bold;">
                     Donation Received: ${new Date().toLocaleString()}
                  </p>
                </div>
              </div>
              
             
            </div>
          </div>
        `
      };

      await transporter.sendMail(mailOptions);
      console.log('✅ Donation email sent successfully!');
      return true;
    } catch (error) {
      console.error('❌ Error sending donation email:', error);
      return false;
    }
  });
};