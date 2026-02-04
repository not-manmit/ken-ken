import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RulesModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const RulesModal: React.FC<RulesModalProps> = ({ isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        className="bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="sticky top-0 bg-gradient-to-r from-primary to-secondary p-6 flex justify-between items-center">
                            <h2 className="text-3xl font-bold text-white">📖 Game Rules</h2>
                            <button
                                className="text-white hover:text-gray-200 text-3xl font-bold"
                                onClick={onClose}
                            >
                                ×
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-8 space-y-6 text-gray-200">
                            {/* Basic Rules */}
                            <section>
                                <h3 className="text-2xl font-bold text-primary mb-3">📐 Basic Rules</h3>
                                <ul className="space-y-2 ml-4">
                                    <li>• Fill the grid with numbers 1 to N (N = grid size)</li>
                                    <li>• <strong>No repeating numbers</strong> in any row or column</li>
                                    <li>• Each <strong>cage</strong> (colored outline) must satisfy its operation</li>
                                    <li>• Complete all cages correctly to win!</li>
                                </ul>
                            </section>

                            {/* Cage Operations */}
                            <section>
                                <h3 className="text-2xl font-bold text-secondary mb-3">🔢 Cage Operations</h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-gray-700 p-4 rounded-lg">
                                        <strong className="text-yellow-400">Addition (+)</strong>
                                        <p className="text-sm mt-1">Example: 7+ means cells add up to 7</p>
                                    </div>
                                    <div className="bg-gray-700 p-4 rounded-lg">
                                        <strong className="text-green-400">Multiplication (×)</strong>
                                        <p className="text-sm mt-1">Example: 12× means cells multiply to 12</p>
                                    </div>
                                    <div className="bg-gray-700 p-4 rounded-lg">
                                        <strong className="text-red-400">Subtraction (-)</strong>
                                        <p className="text-sm mt-1">Example: 3- means difference is 3 (2 cells only)</p>
                                    </div>
                                    <div className="bg-gray-700 p-4 rounded-lg">
                                        <strong className="text-blue-400">Division (÷)</strong>
                                        <p className="text-sm mt-1">Example: 2÷ means one divides other to get 2</p>
                                    </div>
                                    <div className="bg-gray-700 p-4 rounded-lg">
                                        <strong className="text-purple-400">Equals (=)</strong>
                                        <p className="text-sm mt-1">Example: 4= means single cell contains 4</p>
                                    </div>
                                </div>
                            </section>

                            {/* Controls */}
                            <section>
                                <h3 className="text-2xl font-bold text-success mb-3">🎮 Controls</h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <strong className="text-white">Mouse:</strong>
                                        <ul className="text-sm ml-4 mt-2 space-y-1">
                                            <li>• Click cell to select</li>
                                            <li>• Click number to place it</li>
                                            <li>• Click same number to clear</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <strong className="text-white">Keyboard:</strong>
                                        <ul className="text-sm ml-4 mt-2 space-y-1">
                                            <li>• 1-9: Enter numbers</li>
                                            <li>• Arrow keys: Navigate</li>
                                            <li>• Backspace/Delete: Clear cell</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            {/* Scoring */}
                            <section>
                                <h3 className="text-2xl font-bold text-yellow-400 mb-3">⭐ Scoring System</h3>
                                <div className="bg-gray-700 p-4 rounded-lg space-y-2">
                                    <p>Complete cages to earn stars:</p>
                                    <ul className="ml-4 space-y-1">
                                        <li>• <strong>3 Stars</strong> ⭐⭐⭐: Perfect (no mistakes, no hints)</li>
                                        <li>• <strong>2 Stars</strong> ⭐⭐: 1 mistake</li>
                                        <li>• <strong>1 Star</strong> ⭐: 2+ mistakes</li>
                                    </ul>
                                </div>
                            </section>

                            {/* Power-Ups */}
                            <section>
                                <h3 className="text-2xl font-bold text-purple-400 mb-3">💎 Power-Ups</h3>
                                <div className="space-y-2">
                                    <div className="bg-gray-700 p-3 rounded-lg flex justify-between items-center">
                                        <div>
                                            <strong>💡 Smart Hint</strong>
                                            <p className="text-sm">Shows valid numbers for selected cell</p>
                                        </div>
                                        <span className="text-yellow-400 font-bold">5⭐</span>
                                    </div>
                                    <div className="bg-gray-700 p-3 rounded-lg flex justify-between items-center">
                                        <div>
                                            <strong>✓ Cage Validator</strong>
                                            <p className="text-sm">Check if cage is correct</p>
                                        </div>
                                        <span className="text-yellow-400 font-bold">3⭐</span>
                                    </div>
                                    <div className="bg-gray-700 p-3 rounded-lg flex justify-between items-center">
                                        <div>
                                            <strong>↶ Undo Plus</strong>
                                            <p className="text-sm">Unlimited undos for 2 minutes</p>
                                        </div>
                                        <span className="text-yellow-400 font-bold">2⭐</span>
                                    </div>
                                    <div className="bg-gray-700 p-3 rounded-lg flex justify-between items-center">
                                        <div>
                                            <strong>👁 Reveal Region</strong>
                                            <p className="text-sm">Unlock fog-covered area</p>
                                        </div>
                                        <span className="text-yellow-400 font-bold">10⭐</span>
                                    </div>
                                </div>
                            </section>

                            {/* Tips */}
                            <section>
                                <h3 className="text-2xl font-bold text-orange-400 mb-3">💡 Tips for Success</h3>
                                <ul className="space-y-2 ml-4">
                                    <li>• Start with single-cell cages (=) first</li>
                                    <li>• Look for small 2-cell cages next</li>
                                    <li>• Use row/column constraints to eliminate options</li>
                                    <li>• Work on cages that share cells together</li>
                                    <li>• Build combos by avoiding mistakes!</li>
                                </ul>
                            </section>

                            {/* Game Modes */}
                            <section>
                                <h3 className="text-2xl font-bold text-blue-400 mb-3">🌫️ Game Modes</h3>
                                <div className="space-y-3">
                                    <div className="bg-gray-700 p-4 rounded-lg">
                                        <strong className="text-green-400">Normal Mode</strong>
                                        <p className="text-sm mt-1">All cages visible - perfect for learning</p>
                                    </div>
                                    <div className="bg-gray-700 p-4 rounded-lg">
                                        <strong className="text-blue-400">Fog of War</strong>
                                        <p className="text-sm mt-1">
                                            Grid starts hidden - completing cages reveals adjacent areas
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Full Rulebook */}
                            <section className="bg-primary bg-opacity-20 p-4 rounded-lg border-2 border-primary">
                                <p className="text-center">
                                    📚 For detailed rules, strategies, and examples, check the{' '}
                                    <strong>RULEBOOK.md</strong> file in the project folder!
                                </p>
                            </section>
                        </div>

                        {/* Footer */}
                        <div className="sticky bottom-0 bg-gray-900 p-6 text-center">
                            <motion.button
                                className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl"
                                onClick={onClose}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Got It! Let's Play 🎮
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default RulesModal;
