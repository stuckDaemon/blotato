'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /* ============================================================
       POSTS
    ============================================================ */
    await queryInterface.createTable('posts', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
      },

      // Global logical timestamp (serialization authority)
      sequenceId: {
        type: Sequelize.BIGINT,
        allowNull: false,
        unique: true,
      },

      userId: {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      platform: {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      // User intent (sampled from P_ij)
      desiredTime: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      status: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: 'PUBLISHED',
      },

      publishedAt: {
        type: Sequelize.DATE,
      },

      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },

      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },

      deletedAt: {
        type: Sequelize.DATE,
      },
    });

    await queryInterface.addIndex('posts', ['userId']);
    await queryInterface.addIndex('posts', ['platform']);
    await queryInterface.addIndex('posts', ['createdAt']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('posts');
    await queryInterface.sequelize.query(`
      DROP SEQUENCE IF EXISTS global_post_sequence;
    `);
  },
};
