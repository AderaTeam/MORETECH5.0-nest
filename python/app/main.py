from dotenv import load_dotenv
load_dotenv()
import pickle
import tempfile
import shutil
from random import choice
import pandas as pd
import numpy as np
import scipy
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import dill
import torch
from pydantic import BaseModel
from typing import List
class Item(BaseModel):
    lists: List[List[float]]
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=
    [
        "http://localhost:5173/",
        "http://127.0.0.1:5173/",
        "http://178.170.192.87:8000/",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://178.170.192.87:8000",
        "http://178.170.192.87:3000",
        "http://178.170.192.87:3000/"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]

)

data_customer_const_1 = torch.tensor([
    [0, 25, 0, 0, 4, 1, 5, 5, 1, 5, 10],
    [0, 25, 0, 0, 4, 1, 12, 5, 1, 5, 10],
    [0, 25, 0, 0, 1, 1, 18, 5, 1, 5, 10],
    [0, 25, 0, 0, 5, 1, 20, 5, 1, 5, 10],
    [0, 25, 0, 0, 2, 1, 4, 5, 1, 5, 10],
    [0, 25, 0, 0, 1, 1, 5, 5, 1, 5, 10],
]).float()

@app.get('/{amount}')
def default(amount: int):
    objects = []
    for i in range(amount):
        objects.append(choice(data_customer_const_1))
    with open('./env_of_customer/Env.pkl', 'rb') as f:
        Env = dill.load(f)
    with open('./env_of_customer/get_propability_of_walk_age.pkl', 'rb') as f:
        get_propability_of_walk_age = dill.load(f)
    with open('./env_of_customer/get_propability_for_checkout_transport.pkl', 'rb') as f:
        get_propability_for_checkout_transport = dill.load(f)
    with open('./env_of_customer/change_distance_by_transport.pkl', 'rb') as f:
        change_distance_by_transport = dill.load(f)
    with open('models/raiting_check/raiting_checkout_pred_tree.pkl', 'rb') as f:
        raiting_checkout_pred_tree = dill.load(f)
    with open('models/raiting_check/pf.pkl', 'rb') as f:
        pf = dill.load(f)
    with open('models/raiting_check/dataset_preprocessor_for_raiting.pkl', 'rb') as f:
        dataset_preprocessor_for_raiting = dill.load(f)
    with open('models/raiting_check/std_scaler_for_raiting.pkl', 'rb') as f:
        std_scaler_for_raiting = dill.load(f)
    with open('./env_of_customer/from_vector_to_dict.pkl', 'rb') as f:
        from_vector_to_dict = dill.load(f)
    with open('./NNmodel/model_pred.pkl', 'rb') as f:
        model_pred = dill.load(f)
    with open('./NNmodel/model.pkl', 'rb') as f:
        model= dill.load(f)
        
    env = Env(get_propability_for_checkout_transport=get_propability_for_checkout_transport,
    change_distance_by_transport=change_distance_by_transport,
    get_propability_of_walk_age=get_propability_of_walk_age,
    propability_of_checkout_branch_by_raiting=lambda a: raiting_checkout_pred_tree.predict(dataset_preprocessor_for_raiting([a], pf, std_scaler_for_raiting))*100)
    loss = torch.nn.MultiLabelSoftMarginLoss()
    optimizer = torch.optim.Adam(model.parameters(), lr=0.00001)
    return enumerate(model_pred(
    model=model,
    loss=loss,
    data=objects,
    from_vector_to_dict=from_vector_to_dict,
    env=env,
))