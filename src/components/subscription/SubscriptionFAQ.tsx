
import React, { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do the subscription plans work?",
    answer: "Our subscription plans provide access to different levels of content and features. Choose the plan that best fits your learning needs and goals."
  },
  {
    question: "Can I upgrade my plan later?",
    answer: "Yes, you can upgrade or downgrade your subscription at any time. Your benefits will adjust accordingly."
  },
  {
    question: "How do I cancel my subscription?",
    answer: "You can cancel your subscription from your profile settings page at any time. Your access will continue until the end of your current billing period."
  },
  {
    question: "Is there a refund policy?",
    answer: "We offer a 7-day satisfaction guarantee. If you're not satisfied with your premium subscription, contact our support team within 7 days of purchase."
  },
  {
    question: "Will I lose my progress if I cancel?",
    answer: "No, your learning progress is always saved regardless of your subscription status. You'll only lose access to premium features."
  }
];

const SubscriptionFAQ: React.FC = () => {
  return (
    <div className="bg-white/70 backdrop-blur-md rounded-2xl p-8 border border-gray-200 max-w-3xl mx-auto mt-12 mb-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200">
            <AccordionTrigger className="text-left font-medium py-4 hover:text-puzzle-purple transition-colors">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground py-2 px-1">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      
      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">
          Have more questions? <a href="#" className="text-puzzle-purple hover:underline">Contact our support team</a>
        </p>
      </div>
    </div>
  );
};

export default SubscriptionFAQ;
