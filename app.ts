//Validation Logic
interface Validatable{
    value: string |number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}

function validate(validatableInput: Validatable){
    let isValid = true;
    if (validatableInput.required){
        isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }
    if (validatableInput.minLength && typeof validatableInput.value === 'string'){
        isValid = isValid && validatableInput.value.length > validatableInput.minLength

    }
    return isValid;
}

//autobind decorator || används ej.
function autobind(
    target: any, 
    methodName: string, 
    descriptor: PropertyDescriptor
): PropertyDescriptor {
    const originalMethod = descriptor.value;

    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };

    return adjDescriptor;
}



//project input class
class ProjectInput {

    templateElement : HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLFormElement;
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor(){
        this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
        this.hostElement = document.getElementById('app')! as HTMLDivElement;

        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as HTMLFormElement;
        this.element.id = 'user-input';


        this.titleInputElement = this.element.querySelector('#title')! as HTMLInputElement;

        this.descriptionInputElement = this.element.querySelector('#description')! as HTMLInputElement;

        this.peopleInputElement = this.element.querySelector('#people')! as HTMLInputElement;

        this.configure();
        this.attach();
    }

    private gatherUserInput(): [string, string, number] | void {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;

        if(
            validate({value:enteredTitle, required: true, minLength: 5}) &&
            validate({value:enteredDescription, required: true, minLength: 5}) &&
            validate({value:enteredPeople, required: true, minLength: 5}) 

        ){
            alert('Invalid input, please try again!')
            return;
        } else{
            return [enteredTitle, enteredDescription, +enteredPeople ]
        }

    }

    private clearInputs(){
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';

    }

        private submitHandler( event: Event) {
            event.preventDefault();
            const userInput = this.gatherUserInput();
            if (Array.isArray(userInput)){
                const [title, desc, pople] = userInput;
                console.log(title, desc, pople);
                this.clearInputs();
            }
            
        }

        
        private configure(){
            this.element.addEventListener('submit', this.submitHandler.bind(this) );
        }

        private attach() {
            this.hostElement.insertAdjacentElement('afterbegin', this.element);
        
    }

}

const prjInput = new ProjectInput();