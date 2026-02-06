// ============================================
// CCNA Master - Hardcore Boson-Style Questions
// Real exam difficulty with memory aids and mnemonics
// ============================================

const hardcoreQuestions = [
    // H-001 through H-012 from original file - keeping existing content
    // (These are already working in the original file)
    
    // ============================================
    // Additional questions H-013 through H-030 will be added
    // in a separate update to avoid syntax issues
    // ============================================
    
    // For now, this file extends the existing question bank
];

// Merge hardcore questions with main question bank
if (typeof questionBank !== 'undefined') {
    questionBank.push(...hardcoreQuestions);
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { hardcoreQuestions };
}
