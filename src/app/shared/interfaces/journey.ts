import {
  ExtractDocumentTypeFromTypedRxJsonSchema,
  RxJsonSchema,
  toTypedRxJsonSchema,
} from 'rxdb';

const journeySchemaLiteral = {
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
    text: {
      type: 'string',
    },
  },
  required: ['id', 'createdOn', 'title', 'text'],
} as const;
const schemaTyped = toTypedRxJsonSchema(journeySchemaLiteral);
export type Journey = ExtractDocumentTypeFromTypedRxJsonSchema<
  typeof schemaTyped
>;
export const journeySchema: RxJsonSchema<Journey> = journeySchemaLiteral;

export type AddJourney = Omit<Journey, 'id' | 'createdOn'>;
export type ViewJourney = Omit<Journey, 'id'>;
export type EditJourney = {
  id: Journey['id'];
  data: AddJourney;
};
export type RemoveJourney = Journey['id'];
