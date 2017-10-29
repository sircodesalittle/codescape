'''Module docstring as;ldkfj'''
    
def test():
    '''yo'''
    print('test')
    print('more test')
    multiple(8, 9)


def multiply(x, y):
    ''' Doc string'''
    print('test')
    result = 0
    for _ in range(0, y):
        result += x
    return result


class MyClass:
    ''' this is my class'''
    
    def __init__(self):
        self.var = 12

if __name__ == '__main__':
    test()
  