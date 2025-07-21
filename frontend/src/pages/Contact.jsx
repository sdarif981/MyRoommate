import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ loading: false, error: null, success: null });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setStatus({ loading: false, error: null, success: null });
  };

  const validateForm = () => {
    const { name, email, message } = form;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name.trim() || !email.trim() || !message.trim()) {
      return "All fields are required.";
    }
    if (!emailRegex.test(email.trim())) {
      return "Invalid email address.";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: null, success: null });

    const validationError = validateForm();
    if (validationError) {
      setStatus({ loading: false, error: validationError, success: null });
      return;
    }

    try {
      // TODO: Replace this with real API call
      await new Promise((res) => setTimeout(res, 1000));

      setStatus({ loading: false, error: null, success: "Message sent successfully!" });
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus({
        loading: false,
        error: "Something went wrong. Please try again later.",
        success: null,
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex-grow max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Have questions or feedback? We’d love to hear from you! Fill out the form below,
            and our team will get back to you soon.
          </p>
        </section>

        <section className="bg-white shadow-md rounded-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name" className="text-gray-700 font-medium">
                Name
              </Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Your Name"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-gray-700 font-medium">
                Email
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Your Email"
              />
            </div>
            <div>
              <Label htmlFor="message" className="text-gray-700 font-medium">
                Message
              </Label>
              <Textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                placeholder="How can we assist you?"
                rows={5}
              />
            </div>

            {status.error && <p className="text-sm text-red-600">{status.error}</p>}
            {status.success && <p className="text-sm text-green-600">{status.success}</p>}

            <Button
              type="submit"
              disabled={status.loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition-colors"
            >
              {status.loading ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </section>

        <section className="text-center mt-12">
          <p className="text-gray-600">
            Prefer email? Reach us directly at{" "}
            <a href="mailto:support@roommatefinder.com" className="text-blue-600 hover:underline">
              support@roommatefinder.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default Contact;
