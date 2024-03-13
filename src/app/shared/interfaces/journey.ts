import {
  ExtractDocumentTypeFromTypedRxJsonSchema,
  RxJsonSchema,
  toTypedRxJsonSchema,
} from 'rxdb';

export const journeysSchemaLiteral = {
  version: 0,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      maxLength: 100,
    },
    createdOn: {
      type: 'string',
      format: 'date-time',
    },
    title: {
      type: 'string',
    },
    note: {
      type: 'string',
    },
  },
  required: ['id', 'title'],
} as const;
const schemaTyped = toTypedRxJsonSchema(journeysSchemaLiteral);
export type Journey = ExtractDocumentTypeFromTypedRxJsonSchema<
  typeof schemaTyped
>;
export const journeysSchema: RxJsonSchema<Journey> = journeysSchemaLiteral;

export type JourneyId = Journey['id'];
export type AddJourney = Pick<Journey, 'title' | 'note'>;
export type EditJourney = { id: Journey['id']; data: AddJourney };
export type RemoveJourney = JourneyId;
