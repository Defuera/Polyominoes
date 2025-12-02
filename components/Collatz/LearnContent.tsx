'use client';

export default function LearnContent() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-3">
          📚 The Collatz Conjecture
        </h2>
        <p className="text-xl text-gray-600">
          The simplest unsolved problem in mathematics
        </p>
      </div>

      {/* The Rules */}
      <section className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-6 shadow-md">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">The Rules</h3>
        <div className="space-y-3 text-lg">
          <p>Start with any positive integer:</p>
          <div className="bg-white rounded-lg p-4 space-y-2">
            <p className="flex items-center gap-3">
              <span className="font-bold text-blue-600">If even:</span>
              <span>divide by 2</span>
            </p>
            <p className="flex items-center gap-3">
              <span className="font-bold text-red-600">If odd:</span>
              <span>multiply by 3 and add 1</span>
            </p>
            <p className="flex items-center gap-3">
              <span className="font-bold text-green-600">Repeat:</span>
              <span>until you reach 1</span>
            </p>
          </div>
        </div>
      </section>

      {/* Example */}
      <section className="bg-white rounded-xl p-6 shadow-md">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Example: Starting with 6</h3>
        <div className="flex flex-wrap items-center gap-2 text-lg font-mono">
          <span className="px-3 py-2 bg-blue-100 rounded">6</span>
          <span>→</span>
          <span className="px-3 py-2 bg-red-100 rounded">3</span>
          <span>→</span>
          <span className="px-3 py-2 bg-red-100 rounded">10</span>
          <span>→</span>
          <span className="px-3 py-2 bg-red-100 rounded">5</span>
          <span>→</span>
          <span className="px-3 py-2 bg-red-100 rounded">16</span>
          <span>→</span>
          <span className="px-3 py-2 bg-blue-100 rounded">8</span>
          <span>→</span>
          <span className="px-3 py-2 bg-blue-100 rounded">4</span>
          <span>→</span>
          <span className="px-3 py-2 bg-blue-100 rounded">2</span>
          <span>→</span>
          <span className="px-3 py-2 bg-green-100 rounded font-bold">1</span>
        </div>
        <p className="mt-4 text-gray-600">
          ✅ Success! We reached 1 in just 8 steps.
        </p>
      </section>

      {/* The Mystery */}
      <section className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">🤔 The Great Mystery</h3>
        <div className="space-y-4 text-gray-700">
          <p className="text-lg font-semibold">
            <strong>The Conjecture:</strong> Every positive integer eventually reaches 1.
          </p>
          <div className="bg-white rounded-lg p-4 space-y-2">
            <p>✅ <strong>Verified:</strong> Computers have checked all numbers up to 2<sup>68</sup> (that's over 295 quintillion!)</p>
            <p>❌ <strong>Not Proven:</strong> No mathematician has proven it works for ALL numbers</p>
            <p>💰 <strong>No Prize:</strong> Unlike some problems, there's no million-dollar reward, but solving it would make you famous!</p>
          </div>
        </div>
      </section>

      {/* Why It's Hard */}
      <section className="bg-white rounded-xl p-6 shadow-md">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Why Is This So Hard?</h3>
        <div className="space-y-4 text-gray-700">
          <div className="border-l-4 border-purple-500 pl-4">
            <p className="font-bold">1. Unpredictable Behavior</p>
            <p className="text-sm">
              Look at 26 vs 27: they're neighbors, but 26 takes 10 steps while 27 takes 111 steps!
              Small changes create huge differences.
            </p>
          </div>
          <div className="border-l-4 border-blue-500 pl-4">
            <p className="font-bold">2. No Pattern</p>
            <p className="text-sm">
              Scientists have looked for patterns in the numbers, but none have been found that help prove it.
            </p>
          </div>
          <div className="border-l-4 border-red-500 pl-4">
            <p className="font-bold">3. Chaos in Simplicity</p>
            <p className="text-sm">
              The rules are simple enough for a child to understand, but the behavior is chaotic enough to defeat the world's best mathematicians.
            </p>
          </div>
        </div>
      </section>

      {/* Famous Numbers */}
      <section className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-xl p-6 shadow-md">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">🌟 Famous Numbers</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4">
            <div className="text-3xl font-bold text-purple-600 mb-2">27</div>
            <p className="text-sm text-gray-700">
              Takes 111 steps and reaches an incredible height of 9,232! That's 342 times higher than where it started.
            </p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="text-3xl font-bold text-blue-600 mb-2">97</div>
            <p className="text-sm text-gray-700">
              The longest journey under 100, taking 118 steps to reach 1. Try it yourself!
            </p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="text-3xl font-bold text-green-600 mb-2">64</div>
            <p className="text-sm text-gray-700">
              Powers of 2 are "easy" - they just keep halving. 64 → 32 → 16 → 8 → 4 → 2 → 1
            </p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="text-3xl font-bold text-red-600 mb-2">871</div>
            <p className="text-sm text-gray-700">
              Under 1000, this one holds the record with 178 steps to reach 1!
            </p>
          </div>
        </div>
      </section>

      {/* What Mathematicians Say */}
      <section className="bg-white rounded-xl p-6 shadow-md">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">💬 What Mathematicians Say</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-purple-500">
            <p className="text-gray-700 italic mb-2">
              "Mathematics may not be ready for such problems."
            </p>
            <p className="text-sm text-gray-600">— Paul Erdős, legendary mathematician</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-500">
            <p className="text-gray-700 italic mb-2">
              "This is an extraordinarily difficult problem, completely out of reach of present day mathematics."
            </p>
            <p className="text-sm text-gray-600">— Jeffrey Lagarias, 2010</p>
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="bg-white rounded-xl p-6 shadow-md">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Why Does This Matter?</h3>
        <div className="space-y-3 text-gray-700">
          <p>
            <strong className="text-purple-600">1. Shows Limits of Mathematics:</strong> Not everything that seems simple can be solved, even by experts.
          </p>
          <p>
            <strong className="text-blue-600">2. Teaches About Algorithms:</strong> Following simple rules can create complex behavior.
          </p>
          <p>
            <strong className="text-green-600">3. Computational Exploration:</strong> Computers help us explore, but can't prove everything.
          </p>
          <p>
            <strong className="text-red-600">4. Mathematical Humility:</strong> A problem simple enough for kids stumps professional mathematicians!
          </p>
        </div>
      </section>

      {/* Try It Yourself */}
      <section className="bg-gradient-to-r from-green-100 to-blue-100 rounded-xl p-6 shadow-md text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-3">Ready to Explore?</h3>
        <p className="text-gray-700 mb-4">
          Use the other tabs to explore sequences, race numbers against each other, and discover patterns!
        </p>
        <p className="text-lg font-bold text-purple-600">
          Who knows? Maybe you'll notice something nobody else has! 🔍
        </p>
      </section>
    </div>
  );
}
