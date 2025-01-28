import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, Github, Send } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactSection = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Add your form submission logic here
      // Example: await axios.post('/api/contact', formData);
      console.log('Form submitted:', formData);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-white dark:bg-neutral-900 py-20 relative overflow-hidden">
      {/* Animated Background */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-blue-500/30 rounded-full"
          initial={{ 
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: Math.random()
          }}
          animate={{
            y: [null, Math.random() * -500],
            opacity: [null, 0]
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}

      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2"
          >
            <h2 className="text-4xl font-bold dark:text-white">Let's Connect</h2>
            <span className="text-3xl">😺</span>
          </motion.div>
          <div className="w-24 h-1 bg-blue-500 mx-auto mt-4"/>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold dark:text-white mb-6">Get in Touch</h3>
              <div className="space-y-6">
                {[
                  { icon: <Mail className="text-blue-500" />, text: "hello@joshuagoh.com" },
                  { icon: <Phone className="text-blue-500" />, text: "+1234567890" },
                  { icon: <Linkedin className="text-blue-500" />, text: "linkedin.com/in/joshua" },
                  { icon: <Github className="text-blue-500" />, text: "github.com/joshua" }
                ].map((item, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-4 text-neutral-600 dark:text-neutral-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                  >
                    {item.icon}
                    <span>{item.text}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="h-[300px] rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 flex items-center justify-center">
              <p className="text-neutral-500 dark:text-neutral-400">3D Model Coming Soon!</p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            className="space-y-6"
          >
            <div>
              <input 
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                required
                className="w-full px-6 py-4 rounded-xl bg-neutral-50 dark:bg-neutral-800 
                         border-2 border-neutral-100 dark:border-neutral-700
                         focus:border-blue-500 dark:focus:border-blue-500 outline-none
                         text-neutral-900 dark:text-white transition-all"
              />
            </div>
            <div>
              <input 
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="w-full px-6 py-4 rounded-xl bg-neutral-50 dark:bg-neutral-800 
                         border-2 border-neutral-100 dark:border-neutral-700
                         focus:border-blue-500 dark:focus:border-blue-500 outline-none
                         text-neutral-900 dark:text-white transition-all"
              />
            </div>
            <div>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message"
                required
                rows={6}
                className="w-full px-6 py-4 rounded-xl bg-neutral-50 dark:bg-neutral-800 
                         border-2 border-neutral-100 dark:border-neutral-700
                         focus:border-blue-500 dark:focus:border-blue-500 outline-none
                         text-neutral-900 dark:text-white transition-all resize-none"
              />
            </div>
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-6 py-4 bg-blue-500 text-white rounded-xl
                       flex items-center justify-center gap-2 hover:bg-blue-600 
                       transition-colors text-lg font-medium disabled:opacity-70"
            >
              <Send size={20} />
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;