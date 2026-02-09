import React from 'react';
import { motion } from "motion/react"



const CardAnimation = ({ children, transition, className, initial, whileInView, animate }) => {
    return (
        <motion.div
            initial={initial}
            whileInView={whileInView}
            viewport={{ once: true, amount: 0.3 }}
            transition={transition}
            animate={animate}
            className={className}

        >
            {children}
        </motion.div>
    );
};

export default CardAnimation;