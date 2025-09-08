import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>

      <section>
        <h2 className="text-2xl font-semibold">Who are we?</h2>
        <p>
          Radhe Laptops, a company having its registered office at, 55, 2nd
          Floor, Lane-2, Westend Marg, Saidullajab, Near Saket Metro Station,
          New Delhi – 110030, India (“we”, “our” or “us”) take the security of
          your personal data very seriously and are committed to protecting and
          respecting the privacy of the users (“you” or “your”) of our Radhe
          Laptops Website and App (the “Platform”).
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mt-4">What is this privacy notice for?</h2>
        <p>
          We may handle your personal data in connection with your use of the
          Platform. This privacy notice (together with our Terms and
          Conditions) sets out, for the Platform, our collection and sharing
          practices, the uses to which personal data is put, the ways in which
          we protect it in accordance with the data protection laws, and your
          privacy rights. Please read it carefully.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mt-4">Data We Collect</h2>
        <ul className="list-disc ml-6">
          <li>Name, Contact details, Email ID, IMEI, Device Details</li>
          <li>Your communications with Radhe Laptops personnel</li>
          <li>Content you post on our social media sites</li>
          <li>Information you provide on the Website, such as online questionnaires or feedback forms</li>
          <li>Information regarding usage of the Services or Website via web logs</li>
          <li>Publicly available sources like social networks and media</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mt-4">Use of Personal Data</h2>
        <p>Radhe Laptops uses your Personal Data for:</p>
        <ul className="list-disc ml-6">
          <li>Administering our Website and providing Services</li>
          <li>User registration and account management</li>
          <li>Support requests and customer service</li>
          <li>Compliance and security enforcement</li>
          <li>Improving services and user experience</li>
          <li>Marketing communications and advertisements</li>
          <li>Processing payments</li>
          <li>Legal obligations and compliance</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mt-4">Tracking Users’ Use of the Platform</h2>
        <p>
          We use various tools, and collect information to assess how you use
          and interact with the Platform, including details such as your IP
          address, device ID, browser details, location, and more. You can find
          more information about our use of cookies in our Cookies Policy.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mt-4">Disclosure of Your Information</h2>
        <ul className="list-disc ml-6">
          <li>To contracted service providers for hosting, payment, analytics, and support</li>
          <li>To your employer if you register using a corporate email</li>
          <li>In mergers or acquisitions, where necessary</li>
          <li>For data analytics and business improvements</li>
          <li>Public forums and social media platforms</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mt-4">Your Rights and Data Protection</h2>
        <p>
          We process your data based on your consent, legitimate interests,
          legal obligations, and compliance requirements. You have the right to
          access, modify, or delete your personal data by contacting us.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mt-4">Retention Period</h2>
        <p>
          We retain personal data for as long as necessary for business needs,
          compliance, and legal obligations. This includes responding to
          queries, maintaining records, and fulfilling regulatory requirements.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mt-4">Location of Processing</h2>
        <p>
          Radhe Laptops operates solely in India. However, some service
          providers may process data outside India, adhering to applicable data
          protection laws.
        </p>
      </section>

      <footer className="mt-6">
        <p className="text-gray-600">
          For any queries, contact us at <strong>info@radhelaptops.com</strong>
        </p>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
