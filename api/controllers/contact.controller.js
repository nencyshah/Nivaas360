import Contact from "../models/contact.model.js";

export const submitContactForm = async (req, res) => {
  try {
    console.log("Contact form submission received:", req.body);
    
    // Validate required fields
    const { firstName, lastName, email, phone, subject, message } = req.body;
    
    if (!firstName || !lastName || !email || !phone || !subject || !message) {
      return res.status(400).json({ 
        message: "All fields are required!",
        missing: {
          firstName: !firstName,
          lastName: !lastName,
          email: !email,
          phone: !phone,
          subject: !subject,
          message: !message
        }
      });
    }

    const contact = new Contact(req.body);
    await contact.save();
    
    console.log("Contact form saved successfully:", contact._id);
    
    res.status(201).json({ 
      success: true,
      message: "Message sent successfully!",
      contactId: contact._id
    });
  } catch (error) {
    console.error("Error in submitContactForm:", error);
    res.status(500).json({ 
      success: false,
      message: "Something went wrong!", 
      error: error.message 
    });
  }
};
