import React from 'react';
import { motion } from "motion/react"



const CardAnimation = ({ children, delay, className, initial, whileInView}) => {
    return (
        <motion.div
            initial={initial}
            whileInView={whileInView}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: delay }}
            className = {className}

        >
            {children}
        </motion.div>
    );
};

export default CardAnimation;