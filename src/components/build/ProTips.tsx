
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ProTips = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ delay: 0.3 }} 
      className="mt-6"
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-sm md:text-base">💡 Pro Tips</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4">
          <div className="p-3 md:p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2 text-xs md:text-sm">HTML Structure</h4>
            <p className="text-xs md:text-sm text-blue-600">
              Use semantic HTML elements like &lt;header&gt;, &lt;main&gt;, and &lt;footer&gt; for better accessibility.
            </p>
          </div>
          <div className="p-3 md:p-4 bg-green-50 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2 text-xs md:text-sm">CSS Styling</h4>
            <p className="text-xs md:text-sm text-green-600">
              Use CSS Grid and Flexbox for responsive layouts. Try CSS custom properties for consistent theming.
            </p>
          </div>
          <div className="p-3 md:p-4 bg-yellow-50 rounded-lg">
            <h4 className="font-semibold text-yellow-800 mb-2 text-xs md:text-sm">JavaScript Interactivity</h4>
            <p className="text-xs md:text-sm text-yellow-600">
              Add event listeners for user interactions. Use console.log() to debug your JavaScript code.
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProTips;
