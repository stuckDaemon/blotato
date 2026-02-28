'use strict';

const { v4: uuid } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    const calls = [];
    const summaries = [];
    const scams = [];
    const psychologies = [];
    const behaviors = [];
    const compliances = [];
    const enrichments = [];
    const manipulations = [];
    const businesses = [];
    const personas = [];
    const cognitions = [];
    const liabilities = [];
    const trainings = [];

    const now = new Date();

    for (let i = 0; i < 100; i++) {
      const callId = uuid();
      const startedAt = new Date(now.getTime() - i * 60000);
      const endedAt = new Date(startedAt.getTime() + 120000);

      calls.push({
        id: callId,
        sessionId: `session-${i}`,
        provider: 'UNKNOWN',
        direction: i % 2 === 0 ? 'INBOUND' : 'OUTBOUND',
        startedAt,
        endedAt,
        durationSec: 120,
        terminationReason: 'completed',
        assistantHungUp: false,
        createdAt: now,
        updatedAt: null,
      });

      summaries.push({
        id: uuid(),
        callId,
        intent: 'financial_scam_attempt',
        summary: `Mocked summary ${i}`,
        outcome: 'blocked',
        targetNumber: '+393331234567',
        inferredLanguage: 'en',
        keywords: ['bank', 'transfer'],
        createdAt: now,
        updatedAt: null,
      });

      scams.push({
        id: uuid(),
        callId,
        riskScore: Math.floor(Math.random() * 100),
        indicators: ['bank_impersonation'],
        method: 'social_engineering',
        spoofedIdentity: null,
        urgencyLevel: 'high',
        createdAt: now,
        updatedAt: null,
      });

      psychologies.push({
        id: uuid(),
        callId,
        tactics: ['urgency'],
        sentimentCurve: ['neutral', 'aggressive'],
        trustworthiness: 'low',
        emotionalIntensity: 5,
        createdAt: now,
        updatedAt: null,
      });

      behaviors.push({
        id: uuid(),
        callId,
        userTalkRatio: 0.4,
        interruptions: 2,
        hesitationEvents: 1,
        averageSentenceLength: 12,
        createdAt: now,
        updatedAt: null,
      });

      compliances.push({
        id: uuid(),
        callId,
        piiDetected: ['email'],
        consentUnclear: false,
        contentFlags: ['financial_request'],
        createdAt: now,
        updatedAt: null,
      });

      enrichments.push({
        id: uuid(),
        callId,
        inferredLocale: 'en-US',
        callerType: 'unknown',
        languageConfidence: 0.9,
        accentHint: null,
        createdAt: now,
        updatedAt: null,
      });

      manipulations.push({
        id: uuid(),
        callId,
        isScripted: true,
        scriptSimilarityScore: 0.8,
        patternMatchId: null,
        playbackArtifactsDetected: false,
        createdAt: now,
        updatedAt: null,
      });

      businesses.push({
        id: uuid(),
        callId,
        callDuration: 120,
        resolutionLikelihood: 'high',
        nextActionPrediction: 'block_number',
        csatProxyScore: 4,
        createdAt: now,
        updatedAt: null,
      });

      personas.push({
        id: uuid(),
        callId,
        recurringEntityId: null,
        speechPatternTags: ['fast_speaker'],
        riskContext: ['financial'],
        createdAt: now,
        updatedAt: null,
      });

      cognitions.push({
        id: uuid(),
        callId,
        signsOfConfusion: false,
        complexityMismatch: true,
        cognitiveStrainScore: 3,
        createdAt: now,
        updatedAt: null,
      });

      liabilities.push({
        id: uuid(),
        callId,
        hostileLanguage: false,
        coerciveTone: false,
        impersonationOfAuthority: true,
        legalThreatsMade: false,
        createdAt: now,
        updatedAt: null,
      });

      trainings.push({
        id: uuid(),
        callId,
        goodExample: false,
        containsHandoffPattern: false,
        containsClarificationLoop: true,
        potentialUseCase: 'fraud_detection_training',
        createdAt: now,
        updatedAt: null,
      });
    }

    await queryInterface.bulkInsert('calls', calls);
    await queryInterface.bulkInsert('call_summaries', summaries);
    await queryInterface.bulkInsert('call_scams', scams);
    await queryInterface.bulkInsert('call_psychologies', psychologies);
    await queryInterface.bulkInsert('call_behaviors', behaviors);
    await queryInterface.bulkInsert('call_compliances', compliances);
    await queryInterface.bulkInsert('call_enrichments', enrichments);
    await queryInterface.bulkInsert('call_manipulations', manipulations);
    await queryInterface.bulkInsert('call_businesses', businesses);
    await queryInterface.bulkInsert('call_personas', personas);
    await queryInterface.bulkInsert('call_cognitions', cognitions);
    await queryInterface.bulkInsert('call_liabilities', liabilities);
    await queryInterface.bulkInsert('call_trainings', trainings);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('call_trainings', null, {});
    await queryInterface.bulkDelete('call_liabilities', null, {});
    await queryInterface.bulkDelete('call_cognitions', null, {});
    await queryInterface.bulkDelete('call_personas', null, {});
    await queryInterface.bulkDelete('call_businesses', null, {});
    await queryInterface.bulkDelete('call_manipulations', null, {});
    await queryInterface.bulkDelete('call_enrichments', null, {});
    await queryInterface.bulkDelete('call_compliances', null, {});
    await queryInterface.bulkDelete('call_behaviors', null, {});
    await queryInterface.bulkDelete('call_psychologies', null, {});
    await queryInterface.bulkDelete('call_scams', null, {});
    await queryInterface.bulkDelete('call_summaries', null, {});
    await queryInterface.bulkDelete('calls', null, {});
  },
};
