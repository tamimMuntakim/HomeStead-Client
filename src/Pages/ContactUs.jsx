import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const ContactUs = () => {
  const handleContact = (e) => {
    e.preventDefault();
    Swal.fire({
      icon: "success",
      title: "Message sent Successfully! We will contact you soon..",
      timer: 1000
    });
    e.target.reset();
  }
  return (
    <section
      id="contact-us"
      className="w-11/12 md:container mx-auto rounded-md overflow-hidden shadow-xl bg-white px-4 py-8 md:px-12 md:py-8"
    >
      <div className="text-center mb-6 md:mb-12">
        <h2 className="text-2xl md:text-4xl font-bold text-accent mb-4 md:mb-6">
          Get in <span className="text-primary">Touch</span>
        </h2>
        <p className="text-accent w-[80%] mx-auto md:text-lg">
          Have questions or need assistance? We'd love to hear from you. Reach
          out to us through the form below or via our contact details.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">

        <div className="p-6 rounded-lg shadow-md border border-gray-200">
          <form className="bg-white flex flex-col gap-2 md:gap-4" onSubmit={handleContact}>
            <div>
              <label className="block font-medium mb-2">Name</label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full input focus:outline-none focus:ring-2 focus:ring-primary "
              />
            </div>
            <div>
              <label className="block font-medium mb-2">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full input focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block font-medium mb-2">Message</label>
              <textarea
                placeholder="Write your message..."
                className="min-h-32 w-full input focus:outline-none focus:ring-2 focus:ring-primary"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full btn btn-primary text-white"
            >
              Send Message
            </button>
          </form>
        </div>


        <div className="space-y-4 md:space-y-6 text-xs md:text-base">
          <div className="flex items-center gap-2 md:gap-4">
            <FaPhoneAlt className="text-primary" />
            <p className="text-accent font-medium">+880-1768448877</p>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <FaEnvelope className="text-primary" />
            <p className="text-accent font-medium">support@homestead.com</p>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <FaMapMarkerAlt className="text-primary" />
            <p className="text-accent font-medium">Dhaka, Bangladesh</p>
        </div>


          <div className="rounded-lg overflow-hidden shadow-md">
            <iframe
              title="HomeStead Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.2879095121857!2d90.36370788885498!3d23.808359000000017!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c0d64e52c951%3A0xf2cd1aca716f7f10!2sMirpur%2010!5e0!3m2!1sen!2sbd!4v1755435492949!5m2!1sen!2sbd"
              className="w-full h-40 md:h-56"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
