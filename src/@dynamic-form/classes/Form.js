import {FormStage} from './FormStage';

/*
  Form class is a high level reprsentation of the entire form

  It is comprised of an array of FormStages.

  If buttons are visible, callback can be provided to the "Next" button.

  Contrusctor accept an object with 1 valid keys:

  stages:Array<FormStage> - An array of FormStages
*/
let currentFormId = 0;
export class Form {
  constructor(
    {
      stages=[]
    }
  ) {
    if (!stages.length) throw "Stages required for form";
    stages.forEach((stage) => {
      if (!(stage instanceof FormStage)) throw "Stages must use FormStage class."
    });
    this.stages = stages;

    currentFormId++;
    this.id = currentFormId;

    this.loading = false;
    this.error = '';
    this.currentStageIndex = 0;
    this.response = null;
  }

  goBack() {
    if (this.currentStageIndex === 0) return
    this.currentStageIndex--;
  }

  buildPayload() {
    let payload = {};
    this.stages.forEach(stage => {
      stage.fields.forEach(field => {
        if (field.value) payload[field.field] = field.value;
      });
    });

    return payload;
  }

  async goForward() {
    if (this.currentStageIndex === this.stages.length - 1) return;

    const currentStage = this.stages[this.currentStageIndex];

    if (!currentStage) throw "Current stage can't be found."

    this.loading = true;
    this.error = '';
    try {
      this.response = await currentStage.submit(
        this.buildPayload()
      );

      this.currentStageIndex++;
    } catch(e) {
      if (e && e.data && e.data.error) this.error = e.data.error;
    } finally {
      this.loading = false;
    }
  }
}