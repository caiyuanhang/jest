react-testing-library笔记：
一、搜索类型
1、screen拥有隐式断言，即使不使用expect（显示断言），也可以断言。
```js
import React from 'react';
import { render, screen } from '@testing-library/react';
 
import App from './App';
 
describe('App', () => {
  test('renders App component', () => {
    render(<App />);
 
    // implicit assertion
    // because getByText would throw error
    // if element wouldn't be there
    screen.getByText('Search:');
 
    // explicit assertion
    // recommended
    expect(screen.getByText('Search:')).toBeInTheDocument();
  });
});

// 备注：screen.debug()可以输出渲染的dom对象，类似如下的结构
<body>
  <div>
    <div>
      Hello React
    </div>
  </div>
</body>
```

2、搜索函数：getByText()接收一个参数，参数如果是字符串则可以精确匹配，如果是正则表达式则可以部分匹配。
```js
import React from 'react';
import { render, screen } from '@testing-library/react';
 
import App from './App';
 
describe('App', () => {
  test('renders App component', () => {
    render(<App />);
 
    // fails
    expect(screen.getByText('Search')).toBeInTheDocument();
 
    // succeeds
    expect(screen.getByText('Search:')).toBeInTheDocument();
 
    // succeeds
    expect(screen.getByText(/Search/)).toBeInTheDocument();
  });
});
```

3、搜索函数：getByRole()，它的特性是如果你提供了一个不可用的角色，它就会提示角色。
getByRole的一个优点是:如果你提供了一个在渲染组件的HTML中不可用的角色，它会显示所有可选择的角色。
getByRole可以检索到HTML的隐式角色。

常用的搜索函数是getByText()和getByRole()，还有一些其他的搜索类型是更特定于元素的:
LabelText: getByLabelText: <label for="search" />
PlaceholderText: getByPlaceholderText: <input placeholder="Search" />
AltText: getByAltText: <img alt="profile" />
DisplayValue: getByDisplayValue: <input value="JavaScript" />

4、还有最后两种搜索函数：TestId()和getByTestId()


二、搜索变量：getBy（rtl默认使用的搜索变量），此外还有另外两种搜索变量queryBy和findBy
```js
// queryBy的如下：
queryByText
queryByRole
queryByLabelText
queryByPlaceholderText
queryByAltText
queryByDisplayValue

// findBy的如下：
findByText
findByRole
findByLabelText
findByPlaceholderText
findByAltText
findByDisplayValue
```

1、getBy和queryBy的区别是什么？
getBy要么是返回元素，要么就是返回错误。而对一个本来就是Null的元素，返回错误会很难判断测试是否正确，如下例：
```js
import React from 'react';
import { render, screen } from '@testing-library/react';
 
import App from './App';
 
describe('App', () => {
  test('renders App component', () => {
    render(<App />);
 
    screen.debug();
 
    // fails
    expect(screen.getByText(/Searches for JavaScript/)).toBeNull();
  });
});
```
```js
// 而使用queryBy可以断言不存在的元素为Null，而不是错误。
import React from 'react';
import { render, screen } from '@testing-library/react';
 
import App from './App';
 
describe('App', () => {
  test('renders App component', () => {
    render(<App />);
 
    expect(screen.queryByText(/Searches for JavaScript/)).toBeNull();
  });
});

// 所以每次断言不存在的元素时，可以使用queryBy
```
```js
// 关于findBy的使用，对于任何尚未存在但最终将存在的元素，使用findBy而不是getBy或queryBy
import React from 'react';
import { render, screen } from '@testing-library/react';
 
import App from './App';
 
describe('App', () => {
  test('renders App component', async () => {
    render(<App />);
 
    expect(screen.queryByText(/Signed in as/)).toBeNull();
 
    screen.debug();
 
    expect(await screen.findByText(/Signed in as/)).toBeInTheDocument();
 
    screen.debug();
  });
});

// 备注：一开始queryByText是找不到"Signed in as"这个字符串的，直到异步请求完成之后才找到这个文本，也就是findByText之后。
```

2、搜索多个元素：getAllBy、queryAllBy、findAllBy，这几个搜索类型都返回一个元素数组，并且可以再次与搜索类型关联。
```js
// toBeInTheDocument用于检查元素是否存在。
// 通常，所有这些断言函数都起源于Jest。然而，react testing library使用自己的断言函数(如toBeInTheDocument)扩展了这个API。当你使用create-react-app的时候，所有这些断言功能都在一个额外的包里。

toBeDisabled
toBeEnabled
toBeEmpty
toBeEmptyDOMElement
toBeInTheDocument
toBeInvalid
toBeRequired
toBeValid
toBeVisible
toContainElement
toContainHTML
toHaveAttribute
toHaveClass
toHaveFocus
toHaveFormValues
toHaveStyle
toHaveTextContent
toHaveValue
toHaveDisplayValue
toBeChecked
toBePartiallyChecked
toHaveDescription
```


三、触发事件：FIRE EVENT
到目前为止，我们只测试了用getBy(和queryBy)在React组件中是否呈现(或不呈现)一个元素，以及重新呈现的React组件是否有一个想要的元素(findBy)。那么实际的用户交互呢?如果用户输入一个字段，组件可能会重新呈现(就像我们的例子)，新的值应该显示出来(或者在其他地方使用)。

我们可以使用RTL的fireEvent函数来模拟终端用户的交互。让我们看看这是如何工作的输入域:
```js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
 
import App from './App';
 
describe('App', () => {
  test('renders App component', () => {
    render(<App />);
 
    screen.debug();
 
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'JavaScript' },
    });
 
    screen.debug();
  });
});
```

fireEvent函数接受一个元素(这里是文本框角色的输入字段)和一个事件(这里是值为“JavaScript”的事件)。调试函数的输出应该显示事件前后的HTML结构;您应该看到输入字段的新值得到了适当的呈现。
此外，如果你的组件涉及到一个异步任务，就像我们的App组件，因为它获取了一个用户，你可能会看到下面的警告:“警告:在一个测试中对应用程序的更新没有包装在act(…).”对我们来说，这意味着有一些异步任务正在发生，我们需要确保我们的组件能够处理它。通常这可以通过RTL的act函数实现，但这次我们只需要等待用户解决:
```js
describe('App', () => {
  test('renders App component', async () => {
    render(<App />);
 
    // wait for the user to resolve
    // needs only be used in our special case
    await screen.findByText(/Signed in as/);
 
    screen.debug();
 
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'JavaScript' },
    });
 
    screen.debug();
  });
});
```
然后，我们可以从事件之前和之后生成断言:
```js
describe('App', () => {
  test('renders App component', async () => {
    render(<App />);
 
    // wait for the user to resolve
    // needs only be used in our special case
    await screen.findByText(/Signed in as/);
 
    expect(screen.queryByText(/Searches for JavaScript/)).toBeNull();
 
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'JavaScript' },
    });
 
    expect(screen.getByText(/Searches for JavaScript/)).toBeInTheDocument();
  });
});
```
我们使用queryBy search变量来检查元素在事件之前是否存在，使用getBy search变量来检查元素在事件之后是否存在。有时，您会看到人们对后面的断言也使用queryBy，因为当涉及到应该存在的元素时，它可以像getBy一样使用。

就是这样。除了我们需要在测试中处理的异步行为外，可以直接使用RTL的fireEvent函数，然后可以做出断言。


四、用户事件：User EVENT
React testing library附带了一个扩展的User EVENT库，它建立在fireEvent API之上。以前我们使用fireEvent来触发用户交互;这一次我们将使用userEvent作为替代，因为userEvent API比fireEvent API更能模拟实际的浏览器行为。例如，fireEvent.change()只触发change事件，而userEvent。type会触发一个change事件，但也会触发keyDown、keyPress和keyUp事件。
```js
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
 
import App from './App';
 
describe('App', () => {
  test('renders App component', async () => {
    render(<App />);
 
    // wait for the user to resolve
    await screen.findByText(/Signed in as/);
 
    expect(screen.queryByText(/Searches for JavaScript/)).toBeNull();
 
    await userEvent.type(screen.getByRole('textbox'), 'JavaScript');
 
    expect(
      screen.getByText(/Searches for JavaScript/)
    ).toBeInTheDocument();
  });
});
```
在使用React测试库时，尽可能使用userEvent而不是fireEvent。在撰写本文时，userEvent还没有包括fireEvent的所有特性，不过，这在将来可能会改变


五、CALLBACK HANDLERS
有时，您将以单元测试的形式单独测试React组件。通常，这些组件不会有任何副作用或状态，而只有输入(props)和输出(JSX，回调处理程序)。我们已经看到了如何在给定component和props的情况下测试渲染的JSX。现在，我们将测试这个搜索组件的回调处理程序:
```js
function Search({ value, onChange, children }) {
  return (
    <div>
      <label htmlFor="search">{children}</label>
      <input
        id="search"
        type="text"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
```
所有的呈现和断言都像以前一样进行。然而,这一次，我们使用Jest中的一个实用程序来模拟传递给组件的onChange函数。然后，在触发用户在输入字段上的交互后，我们可以断言onChange回调函数已经被调用:
```js
describe('Search', () => {
  test('calls the onChange callback handler', () => {
    const onChange = jest.fn();
 
    render(
      <Search value="" onChange={onChange}>
        Search:
      </Search>
    );
 
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'JavaScript' },
    });
 
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
```
在这里，我们可以看到user Event如何与fire Event更接近地匹配浏览器中的用户行为。fire Event通过只调用一次回调函数来执行更改事件，而user Event会在每次按键时触发它:
```js
describe('Search', () => {
  test('calls the onChange callback handler', async () => {
    const onChange = jest.fn();
 
    render(
      <Search value="" onChange={onChange}>
        Search:
      </Search>
    );
 
    await userEvent.type(screen.getByRole('textbox'), 'JavaScript');
 
    expect(onChange).toHaveBeenCalledTimes(10);
  });
});
```
无论如何，React testing library鼓励您不要单独测试React组件，而是在与其他组件的集成(集成测试)中测试。只有这样，您才能实际测试状态更改是否应用到DOM中，以及副作用是否生效。


六、ASYNCHRONOUS / ASYNC
在使用React的React testing library进行测试时，我们已经看到了如何使用异步await，以便等待特定元素与findBy search变量一起出现。现在，我们将通过一个小示例来测试React中的数据抓取。让我们以以下React组件为例，它使用axios从远程API获取数据:
```js
import React from 'react';
import axios from 'axios';
 
const URL = 'http://hn.algolia.com/api/v1/search';
 
function App() {
  const [stories, setStories] = React.useState([]);
  const [error, setError] = React.useState(null);
 
  async function handleFetch(event) {
    let result;
 
    try {
      result = await axios.get(`${URL}?query=React`);
 
      setStories(result.data.hits);
    } catch (error) {
      setError(error);
    }
  }
 
  return (
    <div>
      <button type="button" onClick={handleFetch}>
        Fetch Stories
      </button>
 
      {error && <span>Something went wrong ...</span>}
 
      <ul>
        {stories.map((story) => (
          <li key={story.objectID}>
            <a href={story.url}>{story.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
 
export default App;
```
点击按钮，我们正在从Hacker News API获取一个stories列表。如果一切顺利，我们将在React中看到作为列表呈现的stories列表。如果出现问题，我们将看到一个错误。App组件的测试如下所示:
```js
import React from 'react';
import axios from 'axios';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
 
import App from './App';
 
jest.mock('axios');
 
describe('App', () => {
  test('fetches stories from an API and displays them', async () => {
    const stories = [
      { objectID: '1', title: 'Hello' },
      { objectID: '2', title: 'React' },
    ];
 
    axios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: { hits: stories } })
    );
 
    render(<App />);
 
    await userEvent.click(screen.getByRole('button'));
 
    const items = await screen.findAllByRole('listitem');
 
    expect(items).toHaveLength(2);
  });
});
```
在渲染App组件之前，我们要确保API得到了mocked。在我们的例子中，axios的返回值来自它的get方法获得的模拟数据。但是，如果您正在使用另一个库或浏览器的native fetch API来获取数据，您将不得不模仿这些。

在模拟API并呈现组件之后，我们使用userEvent API来单击将我们引向API请求的按钮。由于请求是异步的，所以我们必须等待组件更新。和前面一样，我们使用RTL的findBy search变量来等待最终出现的元素。
```js
import React from 'react';
import axios from 'axios';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
 
import App from './App';
 
jest.mock('axios');
 
describe('App', () => {
  test('fetches stories from an API and displays them', async () => {
    ...
  });
 
  test('fetches stories from an API and fails', async () => {
    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error())
    );
 
    render(<App />);
 
    await userEvent.click(screen.getByRole('button'));
 
    const message = await screen.findByText(/Something went wrong/);
 
    expect(message).toBeInTheDocument();
  });
});
```

最后一个测试向您展示了如何测试来自React组件的失败的API请求。我们不是用一个成功解决问题的promise来模拟API，而是用一个错误来拒绝这个promise。在呈现组件并单击按钮之后，我们等待出现错误消息。
```js
import React from 'react';
import axios from 'axios';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
 
import App from './App';
 
jest.mock('axios');
 
describe('App', () => {
  test('fetches stories from an API and displays them', async () => {
    const stories = [
      { objectID: '1', title: 'Hello' },
      { objectID: '2', title: 'React' },
    ];
 
    const promise = Promise.resolve({ data: { hits: stories } });
 
    axios.get.mockImplementationOnce(() => promise);
 
    render(<App />);
 
    await userEvent.click(screen.getByRole('button'));
 
    await act(() => promise);
 
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });
 
  test('fetches stories from an API and fails', async () => {
    ...
  });
});
```
为了完整起见，最后这个测试向您展示了如何以更显式的方式等待promise，如果您不想等待HTML显示，这个方法也可以工作.
毕竟，使用React测试库来测试React中的异步行为并不太难。您必须使用Jest来模拟外部模块(这里是远程API)，然后在测试中等待数据或重新呈现React组件。
React测试库是我用于React组件的常用测试库。我以前一直使用Airbnb的Enzyme，但我喜欢React测试库让你测试用户行为，而不是实现细节。通过编写类似于真实用户场景的测试，您正在测试用户是否可以使用您的应用程序。