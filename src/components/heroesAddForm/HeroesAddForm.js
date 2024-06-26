import { v4 as uuidv4 } from 'uuid';
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import * as Yup from 'yup';

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
    return (
        <Formik initialValues={{
            name: '',
            text: '',
        }}
            validationSchema={Yup.object({
                name: Yup.string()
                    .min(2, 'Минимум 2 символа')
                    .required('Это обязательное поле'),
                text: Yup.string()
                    .min(3, 'Минимум 3 символа')
                    .required('Это обязательное поле'),
                element: Yup.string()
                    .oneOf(['fire', 'water', 'wind', 'earth'], 'Выберите один из доступных элементов')
                    .required('Это обязательное поле')
            })}
            onSubmit={({ name, text, element }) => {
                console.log(`I'm ${name}, I can ${text}, my element is ${element}`)
            }}>
            <Form className="border p-4 shadow-lg rounded">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                    <Field
                        type="text"
                        name="name"
                        className="form-control"
                        id="name"
                        placeholder="Как меня зовут?" />
                </div>

                <div className="mb-3">
                    <label htmlFor="text" className="form-label fs-4">Описание</label>
                    <Field
                        component="textarea"
                        name="text"
                        className="form-control"
                        id="text"
                        placeholder="Что я умею?"
                        style={{ "height": '130px' }} />
                </div>

                <div className="mb-3">
                    <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                    <Field
                        component="select"
                        className="form-select"
                        multiple={false}
                        id="element"
                        name="element">
                        <option value={null}>Я владею элементом...</option>
                        <option value="fire">Огонь</option>
                        <option value="water">Вода</option>
                        <option value="wind">Ветер</option>
                        <option value="earth ">Земля</option>
                    </Field>

                </div>

                <button type="submit" className="btn btn-primary">Создать</button>
            </Form>
        </Formik>
    )
}

export default HeroesAddForm;