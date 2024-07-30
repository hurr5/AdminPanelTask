import { useHttp } from '../../hooks/http.hook';
import { useDispatch, useSelector } from 'react-redux';
import { heroCreated } from '../../actions';
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';
import './heroesAddForm.scss';

const HeroesAddForm = () => {
    const dispatch = useDispatch();
    const { filters, filtersLoadingStatus } = useSelector(state => state.filters)
    const { request } = useHttp();


    const renderFilters = (arr, status) => {
        if (status === "loading") {
            return <option >Fetching elements error</option>
        } else if (status === "error") {
            return <option>Elements error</option>
        }

        if (filters && filters.length > 0) {
            return filters.map(({ name, label }) => {
                // eslint-disable-next-line
                if (name === 'all') return;

                return <option key={name} value={name}>{label}</option>
            })
        }

    }

    return (
        <Formik initialValues={{
            name: '',
            text: '',
            element: ''
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
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={({ name, text, element }, { resetForm }) => {
                const newHero = {
                    id: uuidv4(),
                    name,
                    description: text,
                    element
                };
                request("http://localhost:3001/heroes", "POST", JSON.stringify(newHero))
                    .then(res => {
                        console.log(res, 'Post completed');
                        dispatch(heroCreated(newHero));
                        resetForm();
                    })
                    .catch(err => console.log(err));
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
                    <FormikErrorMessage className='error' name='name' component={CustomErrorMessage} />
                </div>

                <div className="mb-3">
                    <label htmlFor="text" className="form-label fs-4">Описание</label>
                    <Field
                        component="textarea"
                        name="text"
                        className="form-control"
                        id="text"
                        placeholder="Что я умею?"
                        style={{ height: '130px' }} />
                    <FormikErrorMessage className='error' name='text' component={CustomErrorMessage} />
                </div>

                <div className="mb-3">
                    <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                    <Field
                        component="select"
                        className="form-select"
                        id="element"
                        name="element">
                        <option value="">Я владею элементом...</option>
                        {renderFilters(filters, filtersLoadingStatus)}
                    </Field>
                    <FormikErrorMessage className='error' name='element' component={CustomErrorMessage} />
                </div>

                <button type="submit" className="btn btn-primary">Создать</button>
            </Form>
        </Formik>
    );
};

const CustomErrorMessage = ({ children }) => {
    return (
        <div className="error-message">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path fill="#d33648" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
            </svg>
            {children}
        </div>
    );
};

export default HeroesAddForm;
